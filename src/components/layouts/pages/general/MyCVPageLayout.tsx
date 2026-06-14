import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkillSet from "../../../../data/SkillSet";
import database, { timestampToString } from "../../../../data/database";
import Experience from "../../../../data/experience";
import EducationItem from "../../../../data/EducationItem";
import { useAuth } from "../../../../contexts/AuthContext";
import AddExperiencePopup from "../../../molecules/popups/experience/AddExperiencePopup";
import EditExperiencePopup from "../../../molecules/popups/experience/EditExperiencePopup";
import usePopup from "../../../../hooks/usePopup";
import RemoveExperiencesPopup from "../../../molecules/popups/experience/RemoveExperiencesPopup";
import AddEducationPopup from "../../../molecules/popups/education/AddEducationPopup";
import EditEducationPopup from "../../../molecules/popups/education/EditEducationPopup";
import RemoveEducationPopup from "../../../molecules/popups/education/RemoveEducationPopup";
import AddSkillSetPopup from "../../../molecules/popups/skillset/AddSkillSetPopup";
import EditSkillSetPopup from "../../../molecules/popups/skillset/EditSkillSetPopup";
import RemoveSkillSetPopup from "../../../molecules/popups/skillset/RemoveSkillSetPopup";
import PortfolioFooter from "../../../molecules/general/PortfolioFooter";
import useScrollReveal from "../../../../hooks/useScrollReveal";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21h-4z" />
  </svg>
);

const MyCVPageLayout: React.FC = () => {
  const [skillSets, setSkillSets] = useState<SkillSet[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Experience management functionality
  const auth = useAuth();
  const [
    isAddExperiencePopupShown,
    showAddExperiencePopup,
    hideAddExperiencePopup,
  ] = usePopup();
  const [
    isEditExperiencePopupShown,
    showEditExperiencePopup,
    hideEditExperiencePopup,
  ] = usePopup();
  const [
    isRemoveExperiencesPopupShown,
    showRemoveExperiencesPopup,
    hideRemoveExperiencesPopup,
  ] = usePopup();
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  // Education management functionality
  const [
    isAddEducationPopupShown,
    showAddEducationPopup,
    hideAddEducationPopup,
  ] = usePopup();
  const [
    isEditEducationPopupShown,
    showEditEducationPopup,
    hideEditEducationPopup,
  ] = usePopup();
  const [
    isRemoveEducationPopupShown,
    showRemoveEducationPopup,
    hideRemoveEducationPopup,
  ] = usePopup();
  const [selectedEducation, setSelectedEducation] =
    useState<EducationItem | null>(null);

  // Skill set management functionality
  const [isAddSkillSetPopupShown, showAddSkillSetPopup, hideAddSkillSetPopup] =
    usePopup();
  const [
    isEditSkillSetPopupShown,
    showEditSkillSetPopup,
    hideEditSkillSetPopup,
  ] = usePopup();
  const [
    isRemoveSkillSetPopupShown,
    showRemoveSkillSetPopup,
    hideRemoveSkillSetPopup,
  ] = usePopup();
  const [selectedSkillSet, setSelectedSkillSet] = useState<SkillSet | null>(
    null
  );

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useScrollReveal([experiences.length, education.length, skillSets.length]);

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) {
      return;
    }
    setIsGeneratingPdf(true);
    try {
      // Lazy-loaded so the PDF library stays out of the main bundle.
      const { downloadCVPdf } = await import("../../../../utils/generateCVPdf");
      await downloadCVPdf({ experiences, education, skillSets });
    } catch (error) {
      console.error("Failed to generate CV PDF", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const onAddButtonClick = () => { showAddExperiencePopup(); };

  const onEditButtonClick = (experience: Experience) => {
    setSelectedExperience(experience);
    showEditExperiencePopup();
  };

  const onRemoveButtonClick = () => { showRemoveExperiencesPopup(); };

  // Education handlers
  const onAddEducationClick = () => { showAddEducationPopup(); };

  const onEditEducationClick = (educationItem: EducationItem) => {
    setSelectedEducation(educationItem);
    showEditEducationPopup();
  };

  const onRemoveEducationClick = () => { showRemoveEducationPopup(); };

  // Skill set handlers
  const onAddSkillSetClick = () => { showAddSkillSetPopup(); };

  const onEditSkillSetClick = (skillSet: SkillSet) => {
    setSelectedSkillSet(skillSet);
    showEditSkillSetPopup();
  };

  const onRemoveSkillSetClick = () => { showRemoveSkillSetPopup(); };

  const onAddExperienceClose = (addedExperience?: Experience) => {
    hideAddExperiencePopup();
    if (addedExperience) {
      const updatedExperiences = [...experiences, addedExperience].sort(
        (a, b) => b.importance - a.importance
      );
      setExperiences(updatedExperiences);
    }
  };

  const onEditExperienceClose = (updatedExperience?: Experience) => {
    hideEditExperiencePopup();
    setSelectedExperience(null);
    if (updatedExperience) {
      const updatedExperiences = experiences
        .map((exp) =>
          exp.id === updatedExperience.id ? updatedExperience : exp
        )
        .sort((a, b) => b.importance - a.importance);
      setExperiences(updatedExperiences);
    }
  };

  const onRemoveExperiencesClose = (remainingExperiences?: Experience[]): void => {
    hideRemoveExperiencesPopup();
    if (remainingExperiences) {
      setExperiences(remainingExperiences);
    }
  };

  // Education close handlers
  const onAddEducationClose = (addedEducation?: EducationItem) => {
    hideAddEducationPopup();
    if (addedEducation) {
      const updatedEducation = [...education, addedEducation].sort((a, b) => {
        if (b.endYear === "ongoing") return 1;
        if (a.endYear === "ongoing") return -1;
        return parseInt(b.endYear) - parseInt(a.endYear);
      });
      setEducation(updatedEducation);
    }
  };

  const onEditEducationClose = (updatedEducation?: EducationItem) => {
    hideEditEducationPopup();
    setSelectedEducation(null);
    if (updatedEducation) {
      const updatedEducationList = education
        .map((edu) => (edu.id === updatedEducation.id ? updatedEducation : edu))
        .sort((a, b) => {
          if (b.endYear === "ongoing") return 1;
          if (a.endYear === "ongoing") return -1;
          return parseInt(b.endYear) - parseInt(a.endYear);
        });
      setEducation(updatedEducationList);
    }
  };

  const onRemoveEducationClose = (deletedIds?: string[]) => {
    hideRemoveEducationPopup();
    if (deletedIds) {
      setEducation(education.filter((edu) => !deletedIds.includes(edu.id)));
    }
  };

  // Skill set close handlers
  const onAddSkillSetClose = (addedSkillSet?: SkillSet) => {
    hideAddSkillSetPopup();
    if (addedSkillSet) {
      setSkillSets([...skillSets, addedSkillSet]);
    }
  };

  const onEditSkillSetClose = (updatedSkillSet?: SkillSet) => {
    hideEditSkillSetPopup();
    setSelectedSkillSet(null);
    if (updatedSkillSet) {
      setSkillSets(
        skillSets.map((skillSet) =>
          skillSet.id === updatedSkillSet.id ? updatedSkillSet : skillSet
        )
      );
    }
  };

  const onRemoveSkillSetClose = (deletedIds?: string[]) => {
    hideRemoveSkillSetPopup();
    if (deletedIds) {
      setSkillSets(
        skillSets.filter((skillSet) => !deletedIds.includes(skillSet.id))
      );
    }
  };

  useEffect(() => {
    document.title = "Daniel Aboo — Curriculum Vitae";

    database.skillSets.getAll().then((sets) => setSkillSets(sets));
    database.experiences
      .getAll({ field: "importance", direction: "desc" })
      .then((items) => setExperiences(items));
    database.education
      .getAll({ field: "endYear", direction: "desc" })
      .then((items) => setEducation(items));
  }, []);

  const formatExperienceDate = (experience: Experience) => {
    const start = experience.startingDate
      ? timestampToString(experience.startingDate, false, false)
      : "";
    if (experience.endDate === "ongoing") {
      return `${start ? start + " " : ""}— Present`;
    }
    const end = experience.endDate
      ? timestampToString(experience.endDate, false, false)
      : "";
    return [start, end].filter(Boolean).join(" — ");
  };

  return (
    <>
      {/* Experience / Education / Skill-set management popups (owner only) */}
      <AddExperiencePopup
        isPopupShown={isAddExperiencePopupShown}
        onClose={onAddExperienceClose}
      />
      <EditExperiencePopup
        isPopupShown={isEditExperiencePopupShown}
        experience={selectedExperience}
        onClose={onEditExperienceClose}
      />
      <RemoveExperiencesPopup
        isPopupShown={isRemoveExperiencesPopupShown}
        experiences={experiences}
        onClose={onRemoveExperiencesClose}
      />
      <AddEducationPopup
        isPopupShown={isAddEducationPopupShown}
        onClose={onAddEducationClose}
      />
      <EditEducationPopup
        isPopupShown={isEditEducationPopupShown}
        education={selectedEducation}
        onClose={onEditEducationClose}
      />
      <RemoveEducationPopup
        isPopupShown={isRemoveEducationPopupShown}
        educationItems={education}
        onClose={onRemoveEducationClose}
      />
      <AddSkillSetPopup
        isPopupShown={isAddSkillSetPopupShown}
        onClose={onAddSkillSetClose}
      />
      <EditSkillSetPopup
        isPopupShown={isEditSkillSetPopupShown}
        skillSet={selectedSkillSet}
        onClose={onEditSkillSetClose}
      />
      <RemoveSkillSetPopup
        isPopupShown={isRemoveSkillSetPopupShown}
        skillSets={skillSets}
        onClose={onRemoveSkillSetClose}
      />

      {/* HEADER */}
      <section className="wrap cv-header">
        <span className="kicker reveal in">
          <span className="idx">CV</span> — Curriculum Vitae
        </span>
        <h1 className="cv-name reveal in" data-delay="1">
          Daniel Richard Aboo
        </h1>
        <p className="cv-role reveal in" data-delay="2">
          Full-Stack Developer &amp; Prompt Engineer · Building production AI.
        </p>
        <div className="cv-actions reveal in" data-delay="3">
          <button
            className="btn btn-primary"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? "Generating PDF…" : "Download PDF"}{" "}
            <span className="arrow">↓</span>
          </button>
          <Link className="btn btn-ghost" to="/contact">
            Contact me
          </Link>
        </div>
      </section>

      <div className="wrap">
        <div className="divider" />
      </div>

      {/* LAYOUT */}
      <div className="wrap" style={{ paddingTop: "clamp(2.5rem,5vw,4rem)" }}>
        <div className="cv-layout">
          {/* MAIN */}
          <main className="cv-main">
            <section className="cv-block reveal">
              <div className="cv-block-title">
                <h2>Profile</h2>
              </div>
              <p className="cv-summary">
                I've always looked to the future — building solutions with
                technology that change how we live day to day. My mission is to
                innovate while keeping the work understandable and
                collaborative. Creativity, drive and determination define how I
                work; I listen carefully to the people I build with and find the
                path where everyone wins.
              </p>
            </section>

            <section className="cv-block reveal">
              <div className="cv-block-title">
                <h2>Experience</h2>
                <span className="count">
                  {String(experiences.length).padStart(2, "0")}
                </span>
              </div>

              {auth.isOwner && (
                <div className="tag-row" style={{ marginBottom: "1.6rem" }}>
                  <button className="btn btn-sm btn-primary" onClick={onAddButtonClick}>
                    + Add Experience
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={onRemoveButtonClick}>
                    Remove Experiences
                  </button>
                </div>
              )}

              <div className="timeline">
                {experiences.map((experience) => {
                  const isCurrent = experience.endDate === "ongoing";
                  return (
                    <div
                      className={`tl-item${isCurrent ? " current" : ""}`}
                      key={experience.id ?? experience.title}
                    >
                      <div className="tl-meta">
                        {isCurrent && <span className="now">● Now</span>}
                        {formatExperienceDate(experience)}
                      </div>
                      <h3 className="tl-role">{experience.title}</h3>
                      <p className="tl-desc">{experience.description}</p>
                      {auth.isOwner && (
                        <div className="tl-tags">
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => onEditButtonClick(experience)}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="cv-block reveal">
              <div className="cv-block-title">
                <h2>Education</h2>
                {auth.isOwner && (
                  <div className="tag-row">
                    <button className="btn btn-sm btn-primary" onClick={onAddEducationClick}>
                      + Add
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={onRemoveEducationClick}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
              {education.map((item) => (
                <div className="edu-item" key={item.id ?? item.qualification}>
                  <div className="edu-q">{item.qualification}</div>
                  <div className="edu-place">{item.place}</div>
                  <div className="edu-years">
                    {item.startYear} — {item.endYear}
                  </div>
                  {auth.isOwner && (
                    <div style={{ marginTop: "0.7rem" }}>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => onEditEducationClick(item)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </main>

          {/* SIDEBAR */}
          <aside className="cv-side reveal" data-delay="1">
            <div className="side-card side-photo card">
              <img src="/images/me.jpg" alt="Daniel Aboo" />
            </div>

            <div className="side-card card">
              <p className="side-head">Contact</p>
              <div className="side-contact">
                <a href="mailto:me@aboodaniel.pl">
                  <span className="ico">
                    <MailIcon />
                  </span>
                  me@aboodaniel.pl
                </a>
                <a href="tel:+48601951169">
                  <span className="ico">
                    <PhoneIcon />
                  </span>
                  +48 601 951 169
                </a>
                <span>
                  <span className="ico">
                    <PinIcon />
                  </span>
                  Poland
                </span>
                <a
                  href="https://www.linkedin.com/in/danielaboo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ico">
                    <LinkedInIcon />
                  </span>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="side-card card">
              <p className="side-head">Skills</p>
              {auth.isOwner && (
                <div className="tag-row" style={{ marginBottom: "1rem" }}>
                  <button className="btn btn-sm btn-primary" onClick={onAddSkillSetClick}>
                    + Add
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={onRemoveSkillSetClick}>
                    Remove
                  </button>
                </div>
              )}
              {skillSets.map((skillSet) => (
                <div className="skill-group" key={skillSet.name}>
                  <h4>
                    {skillSet.name}
                    {auth.isOwner && (
                      <button
                        className="btn btn-sm btn-ghost"
                        style={{ marginLeft: "10px" }}
                        onClick={() => onEditSkillSetClick(skillSet)}
                      >
                        Edit
                      </button>
                    )}
                  </h4>
                  <div className="hobby-row">
                    {skillSet.skills.map((skill) => (
                      <span className="tag" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="side-card card">
              <p className="side-head">Languages</p>
              <div className="lang-row">
                <span>Polish</span>
                <span className="lvl">Native</span>
              </div>
              <div className="lang-bar">
                <span style={{ width: "100%" }} />
              </div>
              <div style={{ height: "0.9rem" }} />
              <div className="lang-row">
                <span>English</span>
                <span className="lvl">Fluent · C1</span>
              </div>
              <div className="lang-bar">
                <span style={{ width: "92%" }} />
              </div>
            </div>

            <div className="side-card card">
              <p className="side-head">Beyond Code</p>
              <div className="hobby-row">
                <span className="tag">Programming</span>
                <span className="tag">Piano</span>
                <span className="tag">Traveling</span>
                <span className="tag">Photography</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <PortfolioFooter variant="full" ctaLine="Like what you see? Let's build." />
    </>
  );
};

export default MyCVPageLayout;
