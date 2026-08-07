import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "./libs/prisma";

async function main() {
  const email = "admin.ekpratishat@gmail.com";
  const password = "ekpratishatAdmin@123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const passwordMatches = await bcrypt.compare(password, existing.password);
    if (!passwordMatches) {
      await prisma.user.update({
        where: { id: existing.id },
        data: { password: await bcrypt.hash(password, 10) },
      });
    }
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      name: "Ek Pratishat Admin",
      password: hashedPassword,
    },
  });

  console.log(`Seeded admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
