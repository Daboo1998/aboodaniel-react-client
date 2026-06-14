/**
 * @jest-environment node
 */
import path from "path";
import React from "react";
import { pdf } from "@react-pdf/renderer";
import CVDocument from "./generateCVPdf";
import Experience from "../data/experience";
import EducationItem from "../data/EducationItem";
import SkillSet from "../data/SkillSet";

const ts = (year: number, month: number) =>
  ({ toDate: () => new Date(Date.UTC(year, month, 1)) } as any);

const experiences: Experience[] = [
  {
    id: "1",
    importance: 10,
    title: "LivePerson",
    description:
      "Working as a prompt engineer, I develop AI chatbots and agents.",
    startingDate: ts(2024, 8),
    endDate: "ongoing",
  },
  {
    id: "2",
    importance: 9,
    title: "BrainGym.AI",
    description: "Developing education app using low/no-code such as bubble.",
    startingDate: ts(2023, 9),
    endDate: ts(2024, 8),
  },
];

const education: EducationItem[] = [
  {
    id: "1",
    qualification: "BSc Artificial Intelligence",
    place: "University of Groningen (RUG)",
    startYear: "2018",
    endYear: "2021",
  },
];

const skillSets: SkillSet[] = [
  { id: "1", name: "Programming Languages", skills: ["Swift", "TypeScript"] },
];

it("renders a valid PDF buffer from CV data", async () => {
  const instance = pdf(
    <CVDocument
      experiences={experiences}
      education={education}
      skillSets={skillSets}
      photoUrl={path.join(__dirname, "../../public/images/me.jpg")}
    />
  );
  const buffer = await instance.toBuffer();

  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    (buffer as NodeJS.ReadableStream).on("data", (c) =>
      chunks.push(Buffer.from(c))
    );
    (buffer as NodeJS.ReadableStream).on("end", () => resolve());
    (buffer as NodeJS.ReadableStream).on("error", reject);
  });

  const out = Buffer.concat(chunks);
  expect(out.length).toBeGreaterThan(1000);
  expect(out.slice(0, 5).toString()).toBe("%PDF-");
});
