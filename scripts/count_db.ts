import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const counts = {
    users: await prisma.user.count(),
    projects: await prisma.project.count(),
    projectImages: await prisma.projectImage.count(),
    services: await prisma.service.count(),
    jobs: await prisma.job.count(),
    jobApplications: await prisma.jobApplication.count(),
    contactInquiries: await prisma.contactInquiry.count(),
    media: await prisma.media.count(),
    websiteSettings: await prisma.websiteSetting.count(),
    teamMembers: await prisma.teamMember.count(),
    testimonials: await prisma.testimonial.count(),
    activityLogs: await prisma.activityLog.count(),
  };

  console.log('RECORD_COUNTS:', JSON.stringify(counts, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
