import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const data = {
    users: await prisma.user.findMany(),
    projects: await prisma.project.findMany({ include: { images: true } }),
    services: await prisma.service.findMany(),
    jobs: await prisma.job.findMany(),
    jobApplications: await prisma.jobApplication.findMany(),
    contactInquiries: await prisma.contactInquiry.findMany(),
    media: await prisma.media.findMany(),
    websiteSettings: await prisma.websiteSetting.findMany(),
    teamMembers: await prisma.teamMember.findMany(),
    testimonials: await prisma.testimonial.findMany(),
    activityLogs: await prisma.activityLog.findMany(),
  };

  const outputPath = path.join(process.cwd(), 'prisma', 'exported_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Data exported successfully to ${outputPath}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
