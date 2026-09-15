import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with Korals Design Pvt Ltd data...');

  const exportedDataPath = path.join(process.cwd(), 'prisma', 'exported_data.json');

  if (fs.existsSync(exportedDataPath)) {
    console.log('Found exported_data.json! Restoring database state...');
    const raw = fs.readFileSync(exportedDataPath, 'utf-8');
    const data = JSON.parse(raw);

    // Clear existing data in correct dependency order
    await prisma.activityLog.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.teamMember.deleteMany();
    await prisma.media.deleteMany();
    await prisma.contactInquiry.deleteMany();
    await prisma.jobApplication.deleteMany();
    await prisma.job.deleteMany();
    await prisma.service.deleteMany();
    await prisma.projectImage.deleteMany();
    await prisma.project.deleteMany();
    await prisma.websiteSetting.deleteMany();
    await prisma.user.deleteMany();

    // 1. Users
    for (const u of data.users || []) {
      await prisma.user.create({ data: u });
    }

    // 2. Settings
    for (const s of data.websiteSettings || []) {
      await prisma.websiteSetting.create({ data: s });
    }

    // 3. Services
    for (const s of data.services || []) {
      await prisma.service.create({ data: s });
    }

    // 4. Projects & Images
    for (const p of data.projects || []) {
      const { images, ...projectData } = p;
      const createdProject = await prisma.project.create({ data: projectData });
      if (images && images.length > 0) {
        for (const img of images) {
          const { id, projectId, ...imgData } = img;
          await prisma.projectImage.create({
            data: { ...imgData, projectId: createdProject.id },
          });
        }
      }
    }

    // 5. Jobs & Applications
    for (const j of data.jobs || []) {
      await prisma.job.create({ data: j });
    }
    for (const ja of data.jobApplications || []) {
      await prisma.jobApplication.create({ data: ja });
    }

    // 6. Contact Inquiries, Media, Team, Testimonials, Logs
    for (const c of data.contactInquiries || []) {
      await prisma.contactInquiry.create({ data: c });
    }
    for (const m of data.media || []) {
      await prisma.media.create({ data: m });
    }
    for (const t of data.teamMembers || []) {
      await prisma.teamMember.create({ data: t });
    }
    for (const tm of data.testimonials || []) {
      await prisma.testimonial.create({ data: tm });
    }
    for (const al of data.activityLogs || []) {
      await prisma.activityLog.create({ data: al });
    }

    console.log('Restored all records from exported_data.json successfully!');
    return;
  }

  // Fallback to default seed if no exported_data.json exists
  // 1. Create Default Admin
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@koralsdesign.com' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@koralsdesign.com',
        name: 'Administrator',
        passwordHash: passwordHash,
        role: 'ADMIN',
      },
    });
    console.log('Created Admin User: admin@koralsdesign.com / admin123');
  }

  // 2. Clear old data for idempotent seeding
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.job.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.websiteSetting.deleteMany();

  // 3. Website Settings
  const settings = [
    { key: 'site_title', value: 'Korals Design Pvt Ltd | Architecture & Engineering Consultancy' },
    { key: 'hero_title', value: 'INNOVATING INDUSTRIAL SPACES' },
    { key: 'hero_subtitle', value: 'End-to-End Solutions — Design, Approvals and Execution' },
    { key: 'company_address', value: '201, Laximi Narayan, CTS No. 256B/5, Parvati, Pune, India - 411030' },
    { key: 'company_phone', value: '+020 - 24324648' },
    { key: 'company_mobile', value: '+91 9822864648' },
    { key: 'company_email', value: 'projects@koralsdesign.com' },
    { key: 'stat_projects', value: '150+' },
    { key: 'stat_sqft', value: '5.2M+' },
    { key: 'stat_years', value: '20+' },
    { key: 'stat_clients', value: '80+' },
  ];

  for (const setting of settings) {
    await prisma.websiteSetting.create({ data: setting });
  }

  // 4. Team Members
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Mr. Mahesh Govardhan',
        role: 'Director',
        bio: 'Co-Director of Korals Design Pvt Ltd with over two decades of expertise in architectural design, civil engineering project management, and strategic industrial planning across Maharashtra.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
        sortOrder: 1,
      },
      {
        name: 'Mr. Uday Honap',
        role: 'Director',
        bio: 'Co-Director specializing in technical liaison, government permissions, statutory compliance, and large-scale infrastructure project execution.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
        sortOrder: 2,
      },
    ],
  });

  // 5. Services
  const servicesData = [
    {
      number: '01',
      title: 'Architectural Planning and Design',
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      shortDesc: 'Comprehensive architectural concepts, master planning, structural planning, and modern facility design tailored for SEZ and industrial zones.',
      fullDesc: 'Korals Design Pvt Ltd delivers end-to-end architectural planning for industrial, corporate, institutional, and commercial projects. Our design philosophy combines structural durability, optimal spatial flow, regulatory compliance, and energy-efficient environmental design.',
      features: JSON.stringify([
        'Master Site Planning & Layout Design',
        'Industrial Plant Layout & Structural Architecture',
        'Institutional & Corporate Headquarters Design',
        '3D Visualizations & Building Information Modeling (BIM)',
        'Environmental & Sustainable Building Integration'
      ]),
      sortOrder: 1,
    },
    {
      number: '02',
      title: 'Sanctions & Approvals',
      icon: 'FileCheck',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
      shortDesc: 'Complete statutory clearance, technical liaisoning, and sanction approvals across government statutory bodies in Maharashtra.',
      fullDesc: 'Navigating government approvals requires extensive technical knowledge and administrative expertise. We handle all approvals, NOCs, building permissions, and consents with state and municipal authorities.',
      features: JSON.stringify([
        'Development Permissions & Building Plan Sanctions',
        'MPCB (Maharashtra Pollution Control Board) Consents',
        'MIDC (Maharashtra Industrial Development Corp) Clearances',
        'DISH (Directorate of Industrial Safety and Health) Approvals',
        'DSLR / SLR Revenue Clearances & Mojani',
        'PMRDA, PMC, and PCMC Statutory Clearances'
      ]),
      sortOrder: 2,
    },
    {
      number: '03',
      title: 'Land Survey and Consultancy',
      icon: 'MapPin',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
      shortDesc: 'High-precision geospatial surveys, sub-surface scanning, topographic mapping, and land revenue verification.',
      fullDesc: 'Accurate land survey is the bedrock of any successful engineering project. Building on our legacy from Pensioners Land Surveyors Associates (est. 2005), we utilize advanced equipment including DGPS, total stations, and GPR systems.',
      features: JSON.stringify([
        'Topographic & Detailed Contour Surveying',
        'Cutting & Filling Earthwork Quantity Calculation',
        'Land Revenue Survey & Boundary Delineation',
        'Government Mojani Coordination & Verification',
        'GPR (Ground Penetrating Radar) Underground Scanning',
        'EPL Survey & Sub-surface Utility Mapping'
      ]),
      sortOrder: 3,
    },
    {
      number: '04',
      title: 'Project Management Consultancy (PMC)',
      icon: 'Briefcase',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1200',
      shortDesc: 'End-to-end execution supervision, scheduling, quality assurance, estimation, tendering, and invoice certification.',
      fullDesc: 'Our PMC services guarantee projects are completed within budget, on schedule, and to strict technical specifications. We safeguard client investments through rigorous quality audits and transparent vendor monitoring.',
      features: JSON.stringify([
        'Project Master Planning & Timeline Scheduling (CPM/PERT)',
        'Bill of Quantities (BOQ) & Cost Estimation',
        'Contractor Tendering, Bid Evaluation & Vendor Selection',
        'On-site Execution Monitoring & Construction Supervision',
        'Quality Control Audits & Materials Testing Verification',
        'Contractor Billing & Invoice Certification'
      ]),
      sortOrder: 4,
    },
    {
      number: '05',
      title: 'Project Works Consultancy',
      icon: 'CheckSquare',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      shortDesc: 'Technical feasibility studies, third-party inspection, construction audit, and handover documentation.',
      fullDesc: 'Independent technical validation for asset owners, financial institutions, and government bodies. We provide objective assessments to mitigate construction risks and verify compliance.',
      features: JSON.stringify([
        'Project Technical & Financial Feasibility Studies',
        'Third-Party Independent Inspection (TPI)',
        'Construction Quality Audits & As-Built Documentation',
        'Structural Stability Assessment & Due Diligence',
        'Final Handover Documentation & Clearance Verification'
      ]),
      sortOrder: 5,
    },
  ];

  for (const service of servicesData) {
    await prisma.service.create({ data: service });
  }

  // 6. Verified Projects
  await prisma.project.create({
    data: {
      title: 'ALFA LAVAL',
      slug: 'alfa-laval',
      category: 'Industrial',
      location: 'Kasarwadi, Bhosari, Pune',
      area: '12,274 Sq.M.',
      client: 'Alfa Laval India Pvt Ltd',
      year: '2021',
      shortDesc: 'State-of-the-art industrial manufacturing & engineering facility expansion located in Kasarwadi, Bhosari, Pune.',
      fullDesc: 'Korals Design Pvt Ltd provided complete architectural planning, structural coordination, technical liaisoning, and sanction approvals for the expansion of Alfa Laval\'s industrial manufacturing facility in Kasarwadi, Bhosari, Pune.',
      scopeOfWork: JSON.stringify([
        'Architectural Master Planning & Layout',
        'Structural Engineering Coordination',
        'MIDC Building Plan Sanction & Approvals',
        'MPCB Environmental Clearances',
        'Construction Management & Technical Liaisoning'
      ]),
      coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200',
      isFeatured: true,
      isPublished: true,
      seoTitle: 'Alfa Laval Industrial Building | Korals Design Projects',
      seoDesc: 'Architectural planning, sanction approvals, and execution management for Alfa Laval industrial facility in Kasarwadi, Bhosari, Pune.',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200', caption: 'Industrial Facility Frontage', sortOrder: 1 },
          { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200', caption: 'Heavy Manufacturing Floor Layout', sortOrder: 2 },
          { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1200', caption: 'Structural Framework & Crane Girders', sortOrder: 3 },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'SUZLON ENERGY INDUSTRIAL PARK',
      slug: 'suzlon',
      category: 'Industrial',
      location: 'Pune, Maharashtra',
      area: '18,500 Sq.M.',
      client: 'Suzlon Energy Ltd',
      year: '2022',
      shortDesc: 'Renewable energy equipment manufacturing complex completed months ahead of scheduled deadline.',
      fullDesc: 'A flagship renewable energy industrial park project undertaken for Suzlon Energy Ltd. Korals Design delivered comprehensive land survey, earthwork quantity calculations, civil project management, and statutory liaisoning.',
      scopeOfWork: JSON.stringify([
        'DGPS & Topographic Land Surveying',
        'Cutting & Filling Quantity Calculations',
        'Government Mojani & Revenue Approvals',
        'Project Management Consultancy (PMC)',
        'Fast-track Civil Execution Oversight'
      ]),
      coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200',
      isFeatured: true,
      isPublished: true,
      seoTitle: 'Suzlon Energy Industrial Park | Korals Design Projects',
      seoDesc: 'Industrial planning and project management consultancy for Suzlon Energy Ltd completed months ahead of schedule.',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200', caption: 'Suzlon Renewable Technology Complex', sortOrder: 1 },
          { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', caption: 'Corporate & Engineering Annex', sortOrder: 2 },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'SHRIRAMPUR MUNICIPAL CORPORATION',
      slug: 'shrirampur-municipal-corporation',
      category: 'Government',
      location: 'Shrirampur, Maharashtra',
      area: '25,000 Sq.M.',
      client: 'Shrirampur Municipal Corporation',
      year: '2020',
      shortDesc: 'Civic infrastructure master planning, municipal office layout design, and revenue land survey.',
      fullDesc: 'Korals Design was commissioned by Shrirampur Municipal Corporation for complete civic space planning, land revenue survey, contour analysis, and institutional architectural layouts.',
      scopeOfWork: JSON.stringify([
        'Contour Survey & Topographic Mapping',
        'Civic Administrative Complex Architecture',
        'Town Planning Liaisoning & DSLR Clearances',
        'Utility Infrastructure Mapping',
        'Third-Party Construction Supervision'
      ]),
      coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200',
      isFeatured: true,
      isPublished: true,
      seoTitle: 'Shrirampur Municipal Corporation Project | Korals Design',
      seoDesc: 'Civic infrastructure planning and architectural design for Shrirampur Municipal Corporation by Korals Design Pvt Ltd.',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200', caption: 'Municipal Administrative Plaza', sortOrder: 1 },
          { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', caption: 'Civic Center Exterior', sortOrder: 2 },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'PMRDA LOGISTICS & INDUSTRIAL HUB',
      slug: 'pmrda-logistics-hub',
      category: 'Infrastructure',
      location: 'Chakan, PMRDA Region, Pune',
      area: '42,000 Sq.M.',
      client: 'PMRDA & Industrial Partners',
      year: '2023',
      shortDesc: 'Integrated logistics park master planning and multi-tenant warehouse architectural design.',
      fullDesc: 'A major infrastructure and logistics hub planned within the PMRDA region near Chakan.',
      scopeOfWork: JSON.stringify([
        'Master Logistics Park Layout',
        'Underground Utility Scanning (GPR)',
        'PMRDA & MPCB Clearance Facilitation',
        'Heavy Structural Foundation Design',
        'PMC Quality Control Certification'
      ]),
      coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
      isFeatured: false,
      isPublished: true,
      seoTitle: 'PMRDA Logistics Hub | Korals Design Projects',
      seoDesc: 'Logistics and industrial park consultancy under PMRDA jurisdiction in Pune, Maharashtra.',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200', caption: 'Logistics Terminal Overview', sortOrder: 1 },
        ],
      },
    },
  });

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
