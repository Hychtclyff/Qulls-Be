import { db } from "../../configs/db.js";
import * as schema from "../schema/index.js";

async function main() {
  console.log("⏳ Memulai proses seeding data portofolio...");

  try {
    // 1. Bersihkan Data (Urutan hapus: Pivot -> Child -> Parent)
    await db.delete(schema.projectSkills);
    await db.delete(schema.certSkills);
    await db.delete(schema.experiences);
    await db.delete(schema.education);
    await db.delete(schema.certifications);
    await db.delete(schema.projects);
    await db.delete(schema.services);
    await db.delete(schema.socialLinks);
    await db.delete(schema.skills);
    await db.delete(schema.profiles);

    console.log("🧹 Database dibersihkan.");

    // 2. Profile
    const [profile] = await db
      .insert(schema.profiles)
      .values({
        fullName: "Yudriqul Aulia",
        roleId: "Automation Engineer & Fullstack Developer",
        roleEn: "Automation Engineer & Fullstack Developer",
        level: "Intermediate",
        email: "yudriqul@example.com",
        locationId: "Indonesia",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yudriqul",
      })
      .returning();

    // 3. Social Links
    await db.insert(schema.socialLinks).values([
      {
        profileId: profile?.id,
        name: "LinkedIn",
        handle: "yudriqul-aulia",
        url: "https://linkedin.com/in/yudriqul-aulia",
        iconName: "Linkedin",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
      },
      {
        profileId: profile?.id,
        name: "GitHub",
        handle: "yudriqul",
        url: "https://github.com/yudriqul",
        iconName: "Github",
        bgColor: "bg-slate-100",
        textColor: "text-slate-800",
      },
    ]);

    // 4. Skills (Tech Stack)
    const skills = await db
      .insert(schema.skills)
      .values([
        { name: "Python", category: "automation" },
        { name: "TypeScript", category: "frontend" },
        { name: "Next.js", category: "frontend" },
        { name: "PostgreSQL", category: "backend" },
        { name: "Drizzle ORM", category: "backend" },
        { name: "Docker", category: "tools" },
      ])
      .returning();

    const pythonSkill = skills.find((s) => s.name === "Python")!;
    const nextSkill = skills.find((s) => s.name === "Next.js")!;
    const pgSkill = skills.find((s) => s.name === "PostgreSQL")!;

    // 5. Services
    await db.insert(schema.services).values([
      {
        profileId: profile?.id,
        serviceKey: "ai",
        iconName: "Bot",
        colorClass: "text-blue-600",
        bgClass: "bg-blue-50",
        descId: "Python, RPA, dan scripting otomasi.",
        descEn: "Python, RPA, and automation scripting.",
      },
      {
        profileId: profile?.id,
        serviceKey: "web",
        iconName: "Layout",
        colorClass: "text-emerald-600",
        bgClass: "bg-emerald-50",
        descId: "Pengembangan aplikasi web modern dengan Next.js.",
        descEn: "Modern web app development with Next.js.",
      },
    ]);

    // 6. Certifications
    const [cert] = await db
      .insert(schema.certifications)
      .values({
        profileId: profile?.id,
        name: "CCST Networking",
        issuer: "Cisco",
        year: "2024",
        imageUrl: "https://images.credly.com/images/networking-icon.png",
        credentialId: "CERT-12345",
        descId: "Sertifikasi keahlian jaringan dasar.",
        descEn: "Basic networking skills certification.",
      })
      .returning();

    // 7. Projects
    const [project] = await db
      .insert(schema.projects)
      .values({
        profileId: profile?.id,
        titleId: "Sistem Manajemen Gudang",
        titleEn: "Warehouse Management System",
        descId: "Otomasi inventaris menggunakan IoT dan Python.",
        descEn: "Inventory automation using IoT and Python.",
        imageUrl:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
        statLabelId: "Efisiensi",
        statLabelEn: "Efficiency",
        statValue: "40%+",
      })
      .returning();

    // 8. Education
    await db.insert(schema.education).values({
      profileId: profile?.id,
      school: "Universitas Terkemuka",
      degreeId: "Teknik Informatika",
      degreeEn: "Informatics Engineering",
      period: "2019 - 2023",
      descId: "Fokus pada rekayasa perangkat lunak.",
      descEn: "Focus on software engineering.",
    });

    // 9. Experiences
    await db.insert(schema.experiences).values({
      profileId: profile?.id,
      company: "Tech Solutions Inc.",
      roleId: "Automation Engineer",
      roleEn: "Automation Engineer",
      period: "2023 - Present",
      jobType: "full_time",
      descId: "Memimpin proyek otomasi internal perusahaan.",
      descEn: "Leading internal company automation projects.",
      projectId: project?.id,
      certificationId: cert?.id,
    });

    // 10. Pivot Table (Many-to-Many: Project Skills)
    if (project?.id && pythonSkill?.id && pgSkill?.id) {
      await db.insert(schema.projectSkills).values([
        { projectId: project.id, skillId: pythonSkill.id },
        { projectId: project.id, skillId: pgSkill.id },
      ]);
    }

    // 11. Pivot Table (Many-to-Many: Cert Skills)
    if (cert?.id && pythonSkill?.id) {
      await db
        .insert(schema.certSkills)
        .values([{ certificationId: cert.id, skillId: pythonSkill.id }]);
    }
    console.log("✨ Seeding selesai dengan sukses!");
  } catch (error) {
    console.error("❌ Seeding gagal:", error);
    process.exit(1);
  }
}

main();
