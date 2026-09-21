import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

// Check if running on Vercel or Serverless (AWS Lambda)
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
);

let dbPath: string;

if (isServerless) {
  dbPath = path.join("/tmp", "korals_cms.db");
  const bundledDbPath = path.join(process.cwd(), "data", "korals_cms.db");

  if (!fs.existsSync(/*turbopackIgnore: true*/ dbPath)) {
    if (fs.existsSync(bundledDbPath)) {
      try {
        fs.copyFileSync(bundledDbPath, dbPath);
      } catch (err) {
        console.error("Could not copy bundled db to /tmp:", err);
      }
    }
  }
} else {
  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
    } catch (e) {
      console.warn("Could not create db directory:", e);
    }
  }
  dbPath = path.join(dbDir, "korals_cms.db");
}

const db = new Database(dbPath);

try {
  // Enable WAL mode for high performance concurrency
  db.pragma("journal_mode = WAL");
} catch (e) {
  console.warn("Failed to set WAL mode (falling back):", e);
}

// Initialize Schema & Seed Data
export function initDb() {
  try {
    db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS homepage_content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS about_content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS leadership (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT NOT NULL,
      image TEXT,
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_number TEXT NOT NULL,
      title TEXT NOT NULL,
      slug TEXT,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      bullet_points TEXT,
      image TEXT,
      icon TEXT,
      cta_label TEXT,
      cta_link TEXT,
      display_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      client TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL,
      area TEXT,
      description TEXT NOT NULL,
      completion_year TEXT,
      featured_image TEXT NOT NULL,
      gallery_images TEXT,
      is_featured INTEGER DEFAULT 0,
      display_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS careers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      employment_type TEXT NOT NULL,
      description TEXT NOT NULL,
      requirements TEXT,
      application_email TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'NEW',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      filepath TEXT NOT NULL,
      filesize INTEGER,
      filetype TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      data TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS career_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      career_id INTEGER,
      position TEXT NOT NULL,
      applicant_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      portfolio_url TEXT,
      cover_note TEXT,
      status TEXT DEFAULT 'NEW',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS methodology_stages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stage_number TEXT NOT NULL,
      stage_code TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      display_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_user TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS seo_settings (
      page_key TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      og_title TEXT,
      og_description TEXT,
      og_image TEXT,
      canonical_url TEXT
    );
  `);

  // Column Migrations if missing
  try { db.exec("ALTER TABLE services ADD COLUMN slug TEXT;"); } catch {}
  try { db.exec("ALTER TABLE services ADD COLUMN cta_label TEXT;"); } catch {}
  try { db.exec("ALTER TABLE services ADD COLUMN cta_link TEXT;"); } catch {}
  try { db.exec("ALTER TABLE enquiries ADD COLUMN company TEXT;"); } catch {}
  try { db.exec("ALTER TABLE enquiries ADD COLUMN project_type TEXT;"); } catch {}

  // 1. Seed Default Admin User if not exists
  const adminCheck = db.prepare("SELECT COUNT(*) as count FROM admins").get() as { count: number };
  if (adminCheck.count === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("admin123", salt);
    db.prepare("INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)").run("admin", hash);
  }

  // 2. Seed Default Site Settings
  const settingsCheck = db.prepare("SELECT COUNT(*) as count FROM site_settings").get() as { count: number };
  if (settingsCheck.count === 0) {
    const defaultSettings = [
      ["company_name", "KORALS DESIGN PVT LTD"],
      ["company_legal_name", "Korals Design Private Limited"],
      ["address", "201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030"],
      ["phone", "+020 - 24324648"],
      ["mobile", "+91 9822864648"],
      ["email", "projects@koralsdesign.com"],
      ["career_email", "projects@koralsdesign.com"],
      ["location_city", "Parvati, Pune, Maharashtra, India"],
      ["google_maps_url", "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9?g_st=ac"],
    ];
    const insertSetting = db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)");
    for (const [k, v] of defaultSettings) {
      insertSetting.run(k, v);
    }
  } else {
    const updateSetting = db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)");
    updateSetting.run("google_maps_url", "https://maps.app.goo.gl/CtsjULVzCDCBq1Qk9?g_st=ac");
    updateSetting.run("address", "201, Laxmi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030");
    updateSetting.run("email", "projects@koralsdesign.com");
    updateSetting.run("career_email", "projects@koralsdesign.com");
    updateSetting.run("company_name", "KORALS DESIGN PVT LTD");
    updateSetting.run("company_legal_name", "Korals Design Private Limited");
  }

  // 3. Seed Default Homepage Content
  const homeKeys = [
    ["eyebrow", "ARCHITECTURE • CIVIL ENGINEERING • PROJECT CONSULTANCY"],
    ["hero_title", "DESIGNING SPACES."],
    ["hero_highlighted_text", "ENGINEERING POSSIBILITIES."],
    ["hero_subtitle", "Explore opportunities and project solutions that bring architectural design, structural engineering, and statutory project requirements together."],
    ["hero_description", "Integrated architectural master planning, heavy industrial facility layouts, statutory approvals (MIDC, MPCB, PMRDA), and civil execution PMC based in Pune, Maharashtra."],
    ["hero_primary_cta_text", "EXPLORE PROJECTS"],
    ["hero_primary_cta_link", "/projects"],
    ["hero_secondary_cta_text", "START A PROJECT"],
    ["hero_secondary_cta_link", "/contact"],
    ["hero_image", "/images/hero_villa_render.jpg"],
    ["hero_image_alt", "Korals Design Architectural & Engineering Landmark Projects"],
    ["hero_visible", "1"],
    ["practice_section_label", "KD / 01 — PRACTICE STATEMENT"],
    ["practice_heading", "WE DESIGN. WE ENGINEER. WE COORDINATE."],
    ["practice_philosophy", "Korals Design Private Limited brings an integrated approach combining architectural planning, civil engineering project management, ground survey consultancy, and technical liaison with government departments across Maharashtra."],
    ["practice_description", "Established with land surveying roots in 2005 and incorporated as Korals Design Private Limited in 2020, we manage complex industrial manufacturing facilities, corporate headquarters, commercial developments, and municipal civil infrastructure from concept through statutory clearances and site handover."],
    ["practice_architecture_text", "Master planning, conceptual spatial design, 3D visualization, and National Building Code compliance."],
    ["practice_engineering_text", "Civil PMC, structural coordination, quality supervision, and milestone certification."],
    ["practice_coordination_text", "Statutory approvals, technical liaison with MIDC, MPCB, DISH, PMRDA, PMC, PCMC, and revenue authorities."],
    ["cta_heading", "READY TO ENGINEER YOUR NEXT FACILITY?"],
    ["cta_description", "Consult with our directors and engineering team in Pune for end-to-end architectural planning, statutory liaison, and civil execution."],
    ["cta_button_text", "START A PROJECT"],
    ["cta_button_url", "/contact"],
  ];
  const insertHome = db.prepare("INSERT OR IGNORE INTO homepage_content (key, value) VALUES (?, ?)");
  for (const [k, v] of homeKeys) {
    insertHome.run(k, v);
  }

  // 4. Seed Default About Content
  const aboutCheck = db.prepare("SELECT COUNT(*) as count FROM about_content").get() as { count: number };
  if (aboutCheck.count === 0) {
    const defaultAbout = [
      ["company_overview", "Korals Design Private Limited is an architectural services provider located in Pune, Maharashtra, India."],
      ["history_timeline", "Beginning in 2005 with Pensioners Land Surveyors Associates, expanding in 2013 into Korals Engineering Solutions Private Limited with experience across SEZs, industrial, institutional, and corporate projects, and establishing Korals Design Private Limited in 2020."],
      ["capabilities", "Architectural planning and design, civil engineering project management, government procedures, technical liaison with government departments, land surveying, and 3D spatial visualization."],
      ["culture_statement", "Professional growth, employee voice, team development, positive workplace environment, high productivity, and active employee engagement."],
    ];
    const insertAbout = db.prepare("INSERT OR IGNORE INTO about_content (key, value) VALUES (?, ?)");
    for (const [k, v] of defaultAbout) {
      insertAbout.run(k, v);
    }
  }

  // 5. Seed Leadership
  const leaderCheck = db.prepare("SELECT COUNT(*) as count FROM leadership").get() as { count: number };
  if (leaderCheck.count === 0) {
    const leaders = [
      ["Mr. Mahesh Govardhan", "Director", "Director at Korals Design Private Limited, overseeing architectural planning, statutory approvals, and strategic project management.", "/images/hero_villa_render.jpg", 1],
      ["Mr. Uday Honap", "Director", "Director at Korals Design Private Limited, leading civil engineering operations, land survey consultancy, and technical government liaison.", "/images/interior_lounge_1.jpg", 2],
    ];
    const insertLeader = db.prepare("INSERT INTO leadership (name, role, bio, image, display_order) VALUES (?, ?, ?, ?, ?)");
    for (const l of leaders) {
      insertLeader.run(...l);
    }
  }

  // 6. Seed All 8 Professional Services for KORALS DESIGN PVT LTD
  const serviceCheck = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number };
  if (serviceCheck.count < 8) {
    db.prepare("DELETE FROM services").run(); // Clear partial list to ensure clean seed of 8 services

    const initialServices = [
      [
        "01",
        "Architectural Planning & Design",
        "architectural-design",
        "Comprehensive architectural planning, master planning, CAD drawing, and 3D spatial design for industrial, institutional, commercial and corporate developments.",
        "Korals Design provides architectural planning and design solutions for industrial plants, commercial headquarters, and institutional campuses in accordance with national building codes and municipal guidelines.",
        "Architectural Planning,Building Design,Concept Development,Space Planning,Design Development,Construction Documentation,3D Visualization,Walkthroughs",
        "/images/architecture_exterior_1.jpg",
        "Compass",
        "EXPLORE SERVICE →",
        "/services/architectural-design",
        1,
        1
      ],
      [
        "02",
        "Sanctions & Approvals",
        "sanctions-approvals",
        "Technical coordination and liaison support with relevant government departments and authorities for statutory permissions.",
        "Showcasing deep expertise in navigating government procedures, permissions, approvals, and technical coordination with departments including MIDC, MPCB, DISH, PMRDA, PMC, and PCMC.",
        "Development Permissions,Building Approvals,Government Consents,NOC Follow-up,Technical Documentation,Government Department Coordination (MIDC, MPCB, DISH, PMRDA, PMC, PCMC),Approval Process Support",
        "/images/concept_pavilion_1.jpg",
        "ShieldCheck",
        "EXPLORE SERVICE →",
        "/services/sanctions-approvals",
        2,
        1
      ],
      [
        "03",
        "Land Survey & Consultancy",
        "land-survey",
        "Advanced topographic surveying, contour mapping, government Mojani, GPR scans, and underground utility scanning.",
        "Precision surveying technologies using RTK GPS, total stations, and GPR ground scanning for ground truth data and land revenue documentation.",
        "Topographic Survey,Contour Survey,Cutting & Filling Quantity Survey,Land Revenue Survey / Government Mojani,Ground Penetrating Radar (GPR) Survey,EPL Survey,Underground Utility Scanning",
        "/images/sketch_elevation_1.jpg",
        "MapPin",
        "EXPLORE SERVICE →",
        "/services/land-survey",
        3,
        1
      ],
      [
        "04",
        "Project Management Consultancy",
        "project-management",
        "Professional civil engineering and project-management support throughout the project lifecycle from estimation to handover.",
        "End-to-end PMC services managing complex industrial and institutional construction lifecycles on time, within budget, and to international quality benchmarks.",
        "Project Planning,Project Scheduling,Cost Estimation,Tendering & Procurement,Execution Monitoring,Site Supervision,Quality Control,Invoice Certification,Project Coordination",
        "/images/hero_villa_render.jpg",
        "Layers",
        "EXPLORE SERVICE →",
        "/services/project-management",
        4,
        1
      ],
      [
        "05",
        "Project Works Consultancy",
        "project-consultancy",
        "Independent project feasibility studies, third-party technical inspection, and handover works documentation.",
        "Independent technical evaluation, quality auditing, and as-built documentation services to ensure structural compliance and seamless facility handover.",
        "Project Feasibility Study,Third Party Inspection,Construction Documentation,Handover Works Documentation,Structural Compliance Audits",
        "/images/interior_lounge_1.jpg",
        "FileText",
        "EXPLORE SERVICE →",
        "/services/project-consultancy",
        5,
        1
      ],
      [
        "06",
        "Industrial Project Planning",
        "industrial-project-planning",
        "Industrial project planning, plant machinery flow design, process optimization, and technical space allocation.",
        "Specialized industrial facility planning integrating plant layout, heavy machinery positioning, workflow ergonomics, and statutory safety distances.",
        "Industrial Project Planning,Plant Planning,Machinery Planning,Process Flow Design,Industrial Space Planning,Technical Requirement Coordination",
        "/images/creative_facade_1.jpg",
        "Factory",
        "EXPLORE SERVICE →",
        "/services/industrial-project-planning",
        6,
        1
      ],
      [
        "07",
        "Corporate Interiors",
        "corporate-interiors",
        "Corporate interior planning, workplace space optimization, interior design coordination, and functional workspace design.",
        "Designing high-productivity corporate offices, executive suites, conference facilities, and ergonomic workspace layouts tailored for modern enterprises.",
        "Corporate Interior Planning,Workplace Planning,Space Optimization,Interior Design Coordination,Functional Workspace Design",
        "/images/interior_lounge_1.jpg",
        "Layout",
        "EXPLORE SERVICE →",
        "/services/corporate-interiors",
        7,
        1
      ],
      [
        "08",
        "3D Visualization & Walkthrough",
        "3d-visualization",
        "Photorealistic 3D architectural rendering, interior/exterior spatial visualization, and interactive walkthrough presentations.",
        "Bringing architectural blueprints to life with high-definition 3D rendering, lighting simulation, spatial walkthroughs, and executive presentations.",
        "3D Architectural Visualization,Project Visualization,Interior Visualization,Walkthrough Presentation,Design Presentation",
        "/images/hero_villa_sketch.jpg",
        "Eye",
        "EXPLORE SERVICE →",
        "/services/3d-visualization",
        8,
        1
      ]
    ];

    const insertService = db.prepare(`
      INSERT INTO services (
        service_number, title, slug, short_description, full_description,
        bullet_points, image, icon, cta_label, cta_link, display_order, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const s of initialServices) {
      insertService.run(...s);
    }
  }

  // 7. Seed Real Projects
  const projCheck = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
  if (projCheck.count === 0) {
    const initialProjects = [
      [
        "ALFA LAVAL",
        "Alfa Laval India Ltd",
        "Kasarwadi, Bhosari, Pune, Maharashtra",
        "Industrial Building",
        "12,274 Sq.M.",
        "Comprehensive architectural design, civil structural management, and government sanctions for Alfa Laval's manufacturing and administrative facility in Pune.",
        "2022",
        "/images/alfa_laval_facility.png",
        JSON.stringify(["/images/alfa_laval_facility.png", "/images/architecture_exterior_1.jpg"]),
        1,
        1,
        1
      ],
      [
        "SHRIRAMPUR MUNICIPAL CORPORATION",
        "Shrirampur Municipal Corporation",
        "Shrirampur, Maharashtra",
        "Institutional & Municipal",
        "Multi-Acre Campus",
        "Architectural master planning, land survey, contour mapping, and statutory documentation for municipal civil infrastructure.",
        "2021",
        "/images/shrirampur_municipal.jpg",
        JSON.stringify(["/images/shrirampur_municipal.jpg", "/images/sketch_elevation_1.jpg"]),
        1,
        2,
        1
      ],
      [
        "SUZLON ENERGY FACILITY",
        "Suzlon Energy Limited",
        "Pune, Maharashtra",
        "Corporate & Green Energy",
        "Corporate Campus",
        "Land survey consultancy, process flow layout planning, and technical liaison with statutory industrial departments for Suzlon Energy.",
        "2023",
        "/images/suzlon_energy_facility.png",
        JSON.stringify(["/images/suzlon_energy_facility.png", "/images/interior_lounge_1.jpg"]),
        1,
        3,
        1
      ]
    ];
    const insertProj = db.prepare(`
      INSERT INTO projects (name, client, location, category, area, description, completion_year, featured_image, gallery_images, is_featured, display_order, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of initialProjects) {
      insertProj.run(...p);
    }
  }

  // 8. Seed Real Careers
  const careerCheck = db.prepare("SELECT COUNT(*) as count FROM careers").get() as { count: number };
  if (careerCheck.count === 0) {
    const initialCareers = [
      [
        "Construction Safety Manager",
        "Pune, Maharashtra",
        "Full-Time",
        "Oversee site safety compliance, implement hazard mitigation protocols, and ensure DISH / OSHA safety standards across industrial construction sites.",
        "Degree/Diploma in Industrial Safety or Civil Engineering; 5+ years industrial site experience; Expert knowledge of DISH safety norms.",
        "projects@koralsdesign.com",
        1,
        1
      ],
      [
        "Health and Safety Coordinator",
        "Pune, Maharashtra",
        "Full-Time",
        "Coordinate site safety audits, conduct employee safety briefings, maintain accident logs, and ensure daily site compliance.",
        "Diploma in Safety Management / Civil; 2+ years field experience; Strong communication and documentation skills.",
        "projects@koralsdesign.com",
        2,
        1
      ]
    ];
    const insertCareer = db.prepare(`
      INSERT INTO careers (title, location, employment_type, description, requirements, application_email, display_order, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const c of initialCareers) {
      insertCareer.run(...c);
    }
  }

  // 9. Seed Sample Enquiry if empty
  const enqCheck = db.prepare("SELECT COUNT(*) as count FROM enquiries").get() as { count: number };
  if (enqCheck.count === 0) {
    db.prepare(`
      INSERT INTO enquiries (name, email, phone, company, project_type, subject, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "Rajesh Sharma",
      "rajesh.sharma@example.com",
      "+91 9876543210",
      "Sharma Manufacturing Pvt Ltd",
      "Industrial Facility & MIDC Sanctions",
      "Industrial Plant Expansion Enquiry",
      "We are planning an expansion of our manufacturing unit in Chakan MIDC (15,000 Sq.M.). Please provide architectural planning and MPCB approval consultation.",
      "NEW"
    );
  }

  // 10. Seed Methodology Stages if empty
  const methodCheck = db.prepare("SELECT COUNT(*) as count FROM methodology_stages").get() as { count: number };
  if (methodCheck.count === 0) {
    const stages = [
      ["01", "CONCEPT", "CONCEPT", "Site Analysis & Vision", "Topographic land survey, contour mapping, process flow analysis, and site layout feasibility study.", "/images/sketch_elevation_1.jpg", 1, 1],
      ["02", "DESIGN", "DESIGN", "Architectural CAD & 3D", "Detailed architectural master planning, structural engineering design, CAD drafting, and 3D spatial walkthroughs.", "/images/hero_villa_sketch.jpg", 2, 1],
      ["03", "DOCUMENTATION", "DOCUMENTATION", "Statutory File Preparation", "Comprehensive technical dossier compilation, statutory NOC checklist, and municipal building drawing preparation.", "/images/hero_villa_render.jpg", 3, 1],
      ["04", "APPROVALS", "APPROVALS", "Government Sanctions & Liaison", "Technical department liaison and follow-up support for permissions with MIDC, MPCB, DISH, PMRDA, PMC, PCMC.", "/images/concept_pavilion_1.jpg", 4, 1],
      ["05", "PROJECT MANAGEMENT", "PROJECT MANAGEMENT", "PMC & Quality Supervision", "Site supervision, quantity estimation, contractor tendering, milestone tracking, and invoice certification.", "/images/creative_facade_1.jpg", 5, 1],
      ["06", "EXECUTION", "EXECUTION", "Facility Handover & As-Built", "Final structural compliance inspection, third-party quality verification, and operational facility handover.", "/images/architecture_exterior_1.jpg", 6, 1],
    ];
    const insertStage = db.prepare(`
      INSERT INTO methodology_stages (stage_number, stage_code, title, subtitle, description, image, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const s of stages) {
      insertStage.run(...s);
    }
  }

  // 11. Seed SEO Settings if empty
  const seoCheck = db.prepare("SELECT COUNT(*) as count FROM seo_settings").get() as { count: number };
  if (seoCheck.count === 0) {
    const seoEntries = [
      ["home", "Korals Design Private Limited — Architectural & Civil Engineering Consultancy Pune", "Architectural planning, civil engineering project management, statutory government approvals, land surveying, and 3D spatial visualization in Pune, Maharashtra.", "Korals Design Private Limited — Architectural & Civil Engineering Consultancy", "Architectural planning, civil engineering project management, statutory approvals in Pune.", "/images/hero_villa_render.jpg", "https://www.koralsdesign.com"],
      ["about", "About Us | Korals Design Private Limited — 20+ Years Practice Legacy", "Learn about Korals Design leadership, directors Mahesh Govardhan and Uday Honap, and our evolution from land surveying in 2005 to full-service architectural PMC.", "About Korals Design Private Limited", "Two decades of verified architectural, surveying, and civil engineering practice.", "/images/concept_pavilion_1.jpg", "https://www.koralsdesign.com/about"],
      ["projects", "Projects Portfolio | Korals Design — Industrial, Commercial & Municipal Landmark Projects", "Explore featured industrial facilities, corporate headquarters, and municipal infrastructure projects executed by Korals Design in Pune and across Maharashtra.", "Korals Design Practice Portfolio", "Featured architectural, engineering, and municipal projects in Pune.", "/images/hero_villa_render.jpg", "https://www.koralsdesign.com/projects"],
      ["services", "Specialized Services | Korals Design — Architecture, Sanctions & PMC", "8 integrated architectural and engineering disciplines: Architectural Design, Sanctions & Approvals, Land Survey, PMC, Industrial Planning, Corporate Interiors, 3D Visualization.", "Korals Design Core Services", "Integrated architecture, government approvals, land surveying, and project management.", "/images/creative_facade_1.jpg", "https://www.koralsdesign.com/services"],
      ["careers", "Careers at Korals Design | Engineering & Architecture Opportunities Pune", "Join Korals Design Private Limited. Explore job openings in construction safety management, architectural drafting, site civil engineering, and government liaison.", "Careers at Korals Design", "Explore professional architectural and civil engineering opportunities in Pune.", "/images/architecture_exterior_1.jpg", "https://www.koralsdesign.com/careers"],
      ["contact", "Contact Korals Design | Pune Corporate Office & Project Inquiries", "Connect with Korals Design Private Limited at 201 Laxmi Narayan, CTS No. 256B/5, Parvati, Pune. Call +91 9822864648 or submit a project consultation enquiry.", "Contact Korals Design Private Limited", "Corporate office in Parvati, Pune, Maharashtra. Start your architectural project.", "/images/interior_lounge_1.jpg", "https://www.koralsdesign.com/contact"],
    ];
    const insertSeo = db.prepare(`
      INSERT INTO seo_settings (page_key, title, description, og_title, og_description, og_image, canonical_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const se of seoEntries) {
      insertSeo.run(...se);
    }
  }

  // 12. Seed Sample Notification if empty
  const notifCheck = db.prepare("SELECT COUNT(*) as count FROM notifications").get() as { count: number };
  if (notifCheck.count === 0) {
    db.prepare(`
      INSERT INTO notifications (type, title, message, data, is_read)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      "ENQUIRY",
      "New Business Enquiry",
      "Rajesh Sharma submitted an inquiry: Industrial Plant Expansion Enquiry (Chakan MIDC)",
      JSON.stringify({
        name: "Rajesh Sharma",
        email: "rajesh.sharma@example.com",
        phone: "+91 9876543210",
        company: "Sharma Manufacturing Pvt Ltd",
        project_type: "Industrial Facility & MIDC Sanctions",
      }),
      0
    );
  }
  } catch (initErr) {
    console.warn("Database initialization notice:", initErr);
  }
}

// Helper function to create notification
export function createNotification(type: string, title: string, message: string, data?: unknown) {
  try {
    const dataStr = data ? JSON.stringify(data) : null;
    const stmt = db.prepare(`
      INSERT INTO notifications (type, title, message, data, is_read)
      VALUES (?, ?, ?, ?, 0)
    `);
    return stmt.run(type, title, message, dataStr);
  } catch (e) {
    console.error("Failed to create notification:", e);
    return null;
  }
}

// Helper function to log admin activity
export function logActivity(
  adminUser: string,
  action: string,
  entityType: string,
  entityId?: string | number | bigint,
  details?: string
) {
  try {
    const stmt = db.prepare(`
      INSERT INTO activity_logs (admin_user, action, entity_type, entity_id, details)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(adminUser, action, entityType, entityId !== undefined ? entityId.toString() : null, details || null);
  } catch (e) {
    console.error("Failed to log activity:", e);
    return null;
  }
}

// Call initDb on import
initDb();

export default db;
