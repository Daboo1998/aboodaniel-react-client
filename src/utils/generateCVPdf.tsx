import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import Experience from "../data/experience";
import EducationItem from "../data/EducationItem";
import SkillSet from "../data/SkillSet";

/**
 * Data-driven CV / résumé PDF.
 *
 * Rather than printing the rendered web page (which paginates awkwardly and is
 * hard for ATS / AI systems to parse), we build the document from the same data
 * the page renders. The result is a clean, professional A4 résumé with real,
 * selectable text using the built-in Helvetica family — no external fonts to
 * fetch, so it generates reliably on mobile as well as desktop.
 */

const ACCENT = "#2a5bd7";
const INK = "#1b1f27";
const MUTED = "#444b57";
const FAINT = "#7a828f";
const BORDER = "#dfe3ea";

const PROFILE_TEXT =
  "I've always looked to the future — building solutions with technology that " +
  "change how we live day to day. My mission is to innovate while keeping the " +
  "work understandable and collaborative. Creativity, drive and determination " +
  "define how I work; I listen carefully to the people I build with and find " +
  "the path where everyone wins.";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatTimestamp = (ts: { toDate: () => Date }): string => {
  const d = ts.toDate();
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

const formatExperienceRange = (experience: Experience): string => {
  const start = experience.startingDate
    ? formatTimestamp(experience.startingDate)
    : "";
  if (experience.endDate === "ongoing") {
    return start ? `${start} — Present` : "Present";
  }
  const end = experience.endDate ? formatTimestamp(experience.endDate) : "";
  return [start, end].filter(Boolean).join(" — ");
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 44,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: INK,
    lineHeight: 1.5,
  },

  // Header
  kicker: {
    fontSize: 7.5,
    letterSpacing: 2,
    color: ACCENT,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: INK,
    letterSpacing: -0.5,
  },
  role: {
    fontSize: 10.5,
    color: MUTED,
    marginTop: 4,
  },
  rule: {
    height: 1.5,
    backgroundColor: ACCENT,
    marginTop: 12,
    marginBottom: 16,
  },

  // Layout
  body: {
    flexDirection: "row",
  },
  main: {
    flex: 1,
    paddingRight: 22,
  },
  side: {
    width: 168,
  },

  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: INK,
    marginBottom: 8,
  },
  summary: {
    color: MUTED,
    fontSize: 9.5,
    lineHeight: 1.6,
  },

  // Experience
  expItem: {
    marginBottom: 12,
    paddingLeft: 11,
    borderLeftWidth: 1.5,
    borderLeftColor: BORDER,
  },
  expCurrent: {
    borderLeftColor: ACCENT,
  },
  expMeta: {
    fontSize: 7.5,
    color: FAINT,
    letterSpacing: 0.3,
    fontFamily: "Helvetica",
  },
  expTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: INK,
    marginTop: 2,
    marginBottom: 3,
  },
  expDesc: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.5,
  },

  // Education
  eduItem: {
    marginBottom: 10,
  },
  eduQ: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: INK,
  },
  eduPlace: {
    fontSize: 9,
    color: MUTED,
    marginTop: 1,
  },
  eduYears: {
    fontSize: 7.5,
    color: FAINT,
    marginTop: 2,
  },

  // Sidebar
  sideCard: {
    marginBottom: 16,
  },
  sideHead: {
    fontSize: 7.5,
    letterSpacing: 1.5,
    color: FAINT,
    fontFamily: "Helvetica-Bold",
    marginBottom: 7,
  },
  contactRow: {
    fontSize: 9,
    color: INK,
    marginBottom: 4,
  },
  contactLink: {
    fontSize: 9,
    color: INK,
    textDecoration: "none",
    marginBottom: 4,
  },
  skillGroup: {
    marginBottom: 9,
  },
  skillGroupTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: INK,
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 7.5,
    color: MUTED,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 9,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  langName: {
    fontSize: 9,
    color: INK,
  },
  langLevel: {
    fontSize: 7.5,
    color: FAINT,
  },
  langBar: {
    height: 3,
    backgroundColor: BORDER,
    borderRadius: 2,
    marginBottom: 10,
  },
  langFill: {
    height: 3,
    backgroundColor: ACCENT,
    borderRadius: 2,
  },
});

export interface CVPdfData {
  experiences: Experience[];
  education: EducationItem[];
  skillSets: SkillSet[];
}

const CVDocument: React.FC<CVPdfData> = ({
  experiences,
  education,
  skillSets,
}) => (
  <Document
    author="Daniel Richard Aboo"
    title="Daniel Richard Aboo — Curriculum Vitae"
    subject="Curriculum Vitae"
    creator="aboodaniel.pl"
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View>
        <Text style={styles.kicker}>CURRICULUM VITAE</Text>
        <Text style={styles.name}>Daniel Richard Aboo</Text>
        <Text style={styles.role}>
          Full-Stack Developer &amp; Prompt Engineer · Building production AI.
        </Text>
      </View>
      <View style={styles.rule} />

      <View style={styles.body}>
        {/* MAIN COLUMN */}
        <View style={styles.main}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summary}>{PROFILE_TEXT}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experiences.map((experience) => {
              const isCurrent = experience.endDate === "ongoing";
              return (
                <View
                  key={experience.id ?? experience.title}
                  style={
                    isCurrent
                      ? [styles.expItem, styles.expCurrent]
                      : styles.expItem
                  }
                  wrap={false}
                >
                  <Text style={styles.expMeta}>
                    {isCurrent ? "NOW · " : ""}
                    {formatExperienceRange(experience)}
                  </Text>
                  <Text style={styles.expTitle}>{experience.title}</Text>
                  <Text style={styles.expDesc}>{experience.description}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((item) => (
              <View
                key={item.id ?? item.qualification}
                style={styles.eduItem}
                wrap={false}
              >
                <Text style={styles.eduQ}>{item.qualification}</Text>
                <Text style={styles.eduPlace}>{item.place}</Text>
                <Text style={styles.eduYears}>
                  {item.startYear} — {item.endYear}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* SIDEBAR */}
        <View style={styles.side}>
          <View style={styles.sideCard} wrap={false}>
            <Text style={styles.sideHead}>CONTACT</Text>
            <Link src="mailto:me@aboodaniel.pl" style={styles.contactLink}>
              me@aboodaniel.pl
            </Link>
            <Link src="tel:+48601951169" style={styles.contactLink}>
              +48 601 951 169
            </Link>
            <Text style={styles.contactRow}>Poland</Text>
            <Link
              src="https://www.linkedin.com/in/danielaboo"
              style={styles.contactLink}
            >
              linkedin.com/in/danielaboo
            </Link>
          </View>

          {skillSets.length > 0 && (
            <View style={styles.sideCard} wrap={false}>
              <Text style={styles.sideHead}>SKILLS</Text>
              {skillSets.map((skillSet) => (
                <View key={skillSet.id ?? skillSet.name} style={styles.skillGroup}>
                  <Text style={styles.skillGroupTitle}>{skillSet.name}</Text>
                  <View style={styles.tagRow}>
                    {skillSet.skills.map((skill) => (
                      <Text key={skill} style={styles.tag}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.sideCard} wrap={false}>
            <Text style={styles.sideHead}>LANGUAGES</Text>
            <View style={styles.langRow}>
              <Text style={styles.langName}>Polish</Text>
              <Text style={styles.langLevel}>Native</Text>
            </View>
            <View style={styles.langBar}>
              <View style={[styles.langFill, { width: "100%" }]} />
            </View>
            <View style={styles.langRow}>
              <Text style={styles.langName}>English</Text>
              <Text style={styles.langLevel}>Fluent · C1</Text>
            </View>
            <View style={styles.langBar}>
              <View style={[styles.langFill, { width: "92%" }]} />
            </View>
          </View>

          <View style={styles.sideCard} wrap={false}>
            <Text style={styles.sideHead}>BEYOND CODE</Text>
            <View style={styles.tagRow}>
              {["Programming", "Piano", "Traveling", "Photography"].map(
                (hobby) => (
                  <Text key={hobby} style={styles.tag}>
                    {hobby}
                  </Text>
                )
              )}
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

/**
 * Builds the CV PDF from the supplied data and triggers a download in the
 * browser. Works on both desktop and mobile (generates a Blob and uses a
 * temporary object URL rather than relying on the print dialog).
 */
export const downloadCVPdf = async (data: CVPdfData): Promise<void> => {
  const blob = await pdf(<CVDocument {...data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Daniel_Richard_Aboo_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

export default CVDocument;
