import { db } from "../../configs/db.js";
import * as schema from "../schema/index.js";

async function main() {
  console.log("⏳ Memulai proses seeding data portofolio & Life OS...");

  try {
    // ==========================================
    // 1. CLEANUP (Membersihkan Database)
    // ==========================================
    console.log("🧹 Membersihkan database lama...");

    // A. Hapus Child / Pivot Tables (Relasi Banyak-ke-Banyak)
    await db.delete(schema.projectSkills);
    await db.delete(schema.projectMembers);
    await db.delete(schema.postTags);
    await db.delete(schema.socialLinks);

    // B. Hapus Data Transaksional / Dependen
    await db.delete(schema.tasks); // Tasks punya FK ke Projects
    await db.delete(schema.projects); // Projects punya FK ke Experiences & Methods

    // C. Hapus Data Utama (Parent Tables)
    await db.delete(schema.experiences);
    await db.delete(schema.education);
    await db.delete(schema.skills);
    await db.delete(schema.certifications);
    await db.delete(schema.posts);

    // D. Hapus Data Life OS
    await db.delete(schema.schedules);
    await db.delete(schema.finances);
    await db.delete(schema.strategies);
    await db.delete(schema.habits);
    await db.delete(schema.notes);
    await db.delete(schema.inbox);
    await db.delete(schema.footballMatches);
    await db.delete(schema.analyticsDaily);
    await db.delete(schema.githubContributions);

    // E. Hapus Master Data & Profile (Root References)
    await db.delete(schema.profiles);
    await db.delete(schema.skillCategories);
    await db.delete(schema.developmentMethods);
    await db.delete(schema.certificateIssuers);
    await db.delete(schema.tags);

    console.log("✅ Database bersih.");

    // ==========================================
    // 2. SEEDING MASTER DATA (REFERENCES)
    // ==========================================

    // A. Skill Categories
    // const skillCats = await db
    //   .insert(schema.skillCategories)
    //   .values([
    //     { name: "Sword Skill (Frontend)", iconName: "Layout" },
    //     { name: "Sacred Arts (Backend)", iconName: "Server" },
    //     { name: "Incarnation (DevOps)", iconName: "Cloud" },
    //     { name: "Blacksmithing (Tools)", iconName: "Wrench" },
    //   ])
    //   .returning();

    // // B. Development Methods
    // const methods = await db
    //   .insert(schema.developmentMethods)
    //   .values([
    //     { name: "Agile Scramble" },
    //     { name: "Waterfall Cascade" },
    //     { name: "Kanban Flow" },
    //   ])
    //   .returning();

    // // C. Certificate Issuers
    // const issuers = await db
    //   .insert(schema.certificateIssuers)
    //   .values([
    //     {
    //       name: "Cisco Systems",
    //       logoUrl:
    //         "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
    //     },
    //     {
    //       name: "Google Cloud",
    //       logoUrl:
    //         "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    //     },
    //     {
    //       name: "HackerRank",
    //       logoUrl:
    //         "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    //     },
    //   ])
    //   .returning();

    // if (!skillCats.length || !methods.length || !issuers.length) {
    //   throw new Error("Gagal seeding master data.");
    // }

    // // ==========================================
    // // 3. SEEDING PUBLIC PORTFOLIO
    // // ==========================================

    // // A. Profile
    // const [profile] = await db
    //   .insert(schema.profiles)
    //   .values({
    //     // Karena kita set ID default(1) di schema, kita tidak perlu kirim ID di sini
    //     // kecuali mau memaksa overwrite.
    //     fullName: "Yudriqul Aulia",
    //     roleId: "Pengembang Fullstack & Otomasi",
    //     roleEn: "Fullstack & Automation Engineer",
    //     level: "Object Control Authority: 50",
    //     aboutId:
    //       "Saya adalah pengembang yang fokus pada efisiensi dan skalabilitas sistem.",
    //     aboutEn:
    //       "I am a developer focused on system efficiency and scalability.",
    //     email: "yudriqul@example.com",
    //     location: "Indonesia",
    //     imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yudriqul",
    //     cvUrl: "https://example.com/cv.pdf",
    //   })
    //   .returning();

    // if (!profile) throw new Error("Gagal membuat profile");

    // // B. Social Links
    // await db.insert(schema.socialLinks).values([
    //   {
    //     profileId: profile.id,
    //     name: "LinkedIn",
    //     handle: "yudriqul-aulia",
    //     url: "https://linkedin.com",
    //     iconName: "Linkedin",
    //     bgColor: "bg-blue-600",
    //   },
    //   {
    //     profileId: profile.id,
    //     name: "GitHub",
    //     handle: "yudriqul",
    //     url: "https://github.com",
    //     iconName: "Github",
    //     bgColor: "bg-slate-800",
    //   },
    //   {
    //     profileId: profile.id,
    //     name: "Twitter",
    //     handle: "@yudriqul",
    //     url: "https://twitter.com",
    //     iconName: "Twitter",
    //     bgColor: "bg-sky-500",
    //   },
    // ]);

    // // C. Skills
    // const frontendCat = skillCats.find((c) => c.name.includes("Frontend"));
    // const backendCat = skillCats.find((c) => c.name.includes("Backend"));

    // if (!frontendCat || !backendCat)
    //   throw new Error("Kategori skill tidak ditemukan");

    // // Kita simpan hasil insert ke variabel 'skills' (Array)
    // const skills = await db
    //   .insert(schema.skills)
    //   .values([
    //     {
    //       name: "Next.js",
    //       categoryId: frontendCat.id,
    //       iconName: "Code",
    //       proficiency: 90,
    //     }, // index 0
    //     {
    //       name: "TypeScript",
    //       categoryId: frontendCat.id,
    //       iconName: "FileCode",
    //       proficiency: 85,
    //     }, // index 1
    //     {
    //       name: "Python",
    //       categoryId: backendCat.id,
    //       iconName: "Terminal",
    //       proficiency: 95,
    //     }, // index 2
    //     {
    //       name: "PostgreSQL",
    //       categoryId: backendCat.id,
    //       iconName: "Database",
    //       proficiency: 80,
    //     }, // index 3
    //   ])
    //   .returning();

    // if (skills.length < 4) throw new Error("Gagal insert skills");

    // // D. Experiences
    // const [exp1] = await db
    //   .insert(schema.experiences)
    //   .values({
    //     company: "Tech Solutions Inc.",
    //     roleId: "Insinyur Otomasi",
    //     roleEn: "Automation Engineer",
    //     period: "2023 - Present",
    //     jobType: "Full-time",
    //     descId:
    //       "Memimpin proyek otomasi internal menggunakan Python dan Selenium.",
    //     descEn:
    //       "Leading internal automation projects using Python and Selenium.",
    //   })
    //   .returning();

    // // E. Projects
    // const [project1] = await db
    //   .insert(schema.projects)
    //   .values({
    //     titleId: "Sistem Manajemen Gudang",
    //     titleEn: "Warehouse Management System",
    //     descId: "Otomasi inventaris menggunakan IoT dan Python.",
    //     descEn: "Inventory automation using IoT and Python.",
    //     imageUrl:
    //       "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    //     repoUrl: "https://github.com/yudriqul/wms-iot",
    //     methodId: methods[0].id, // Agile
    //     experienceId: exp1.id,
    //     status: "Active",
    //     progress: 85,
    //     priority: "High",
    //     isFeatured: true,
    //     public: true,
    //   })
    //   .returning();

    // // F. Project Skills (Pivot) - PERBAIKAN DI SINI
    // // Kita gunakan index array dari variabel 'skills' di atas.
    // await db.insert(schema.projectSkills).values([
    //   { projectId: project1.id, skillId: skills[2].id }, // skills[2] adalah Python
    //   { projectId: project1.id, skillId: skills[3].id }, // skills[3] adalah PostgreSQL
    // ]);

    // // G. Certifications
    // await db.insert(schema.certifications).values({
    //   name: "CCST Networking",
    //   issuerId: issuers[0].id, // Cisco
    //   year: "2024",
    //   credentialId: "CERT-12345",
    //   url: "https://credly.com",
    // });

    // // ==========================================
    // // 4. SEEDING LIFE OS (ADMIN DASHBOARD)
    // // ==========================================

    // // A. Tasks
    // await db.insert(schema.tasks).values([
    //   {
    //     title: "Optimize Database Queries",
    //     status: "active",
    //     priority: "Critical",
    //     type: "Main Quest",
    //     dueDate: "2026-05-30",
    //     projectId: project1.id,
    //   },
    //   {
    //     title: "Update Portfolio UI",
    //     status: "todo",
    //     priority: "Medium",
    //     type: "Side Quest",
    //     dueDate: "2026-06-05",
    //   },
    //   {
    //     title: "Daily Commit Streak",
    //     status: "active",
    //     priority: "Low",
    //     type: "Daily",
    //     dueDate: "2026-05-24",
    //   },
    // ]);

    // // B. Schedules
    // await db.insert(schema.schedules).values([
    //   {
    //     title: "Weekly Team Sync",
    //     type: "Briefing",
    //     date: "2026-05-25",
    //     startTime: "09:00",
    //     endTime: "10:00",
    //     location: "Zoom",
    //     colorClass: "bg-indigo-100 text-indigo-700",
    //   },
    //   {
    //     title: "Code Review Session",
    //     type: "Mission",
    //     date: "2026-05-25",
    //     startTime: "14:00",
    //     endTime: "16:00",
    //     location: "Office",
    //     colorClass: "bg-emerald-100 text-emerald-700",
    //   },
    // ]);

    // // C. Finances
    // await db.insert(schema.finances).values([
    //   {
    //     title: "Freelance Project Payment",
    //     amount: "5000.00",
    //     type: "income",
    //     category: "Trade",
    //     transactionDate: "2026-05-20",
    //   },
    //   {
    //     title: "Server Hosting (Vercel)",
    //     amount: "20.00",
    //     type: "expense",
    //     category: "Maintenance",
    //     transactionDate: "2026-05-21",
    //   },
    //   {
    //     title: "New Mechanical Keyboard",
    //     amount: "150.00",
    //     type: "expense",
    //     category: "Consumables",
    //     transactionDate: "2026-05-22",
    //   },
    // ]);

    // // D. Strategies
    // await db.insert(schema.strategies).values([
    //   {
    //     title: "Master React Server Components",
    //     type: "short",
    //     status: "In Progress",
    //     deadline: "June 2026",
    //     progress: 65,
    //     category: "Skill",
    //   },
    //   {
    //     title: "Become Senior Tech Lead",
    //     type: "long",
    //     status: "Locked",
    //     deadline: "Year 2028",
    //     progress: 0,
    //     category: "Career",
    //   },
    // ]);

    // // E. Football Widget
    // await db.insert(schema.footballMatches).values([
    //   {
    //     opponentName: "Real Madrid",
    //     competition: "La Liga",
    //     matchDate: "2026-05-28",
    //     matchTime: "21:00",
    //     isHome: true,
    //     homeScore: 3,
    //     awayScore: 1,
    //     status: "Finished",
    //   },
    //   {
    //     opponentName: "Bayern Munich",
    //     competition: "UCL Final",
    //     matchDate: "2026-06-04",
    //     matchTime: "20:45",
    //     isHome: false,
    //     status: "Upcoming",
    //   },
    // ]);

    // console.log("✨ Seeding selesai dengan sukses!");
  } catch (error) {
    console.error("❌ Seeding gagal:", error);
    process.exit(1);
  }
}

main();
