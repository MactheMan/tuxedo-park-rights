const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, FootnoteReferenceRun,
  Header, Footer, AlignmentType, PageNumber, HeadingLevel, LevelFormat,
  BorderStyle, ShadingType, Table, TableRow, TableCell, WidthType
} = require("docx");

const OUT = "/home/user/workspace/FOIL_Administrative_Appeal_September_15_2026.docx";
const green = "163D32";
const gold = "A96F25";
const gray = "5D6964";
const light = "EDF2EF";
const border = { style: BorderStyle.SINGLE, size: 4, color: "D7D2C7" };
const borders = { top: border, bottom: border, left: border, right: border };

function p(text, options = {}) {
  return new Paragraph({
    spacing: { after: options.after ?? 130, line: 280 },
    alignment: options.alignment,
    keepNext: options.keepNext,
    children: [new TextRun({
      text,
      bold: options.bold,
      italics: options.italics,
      color: options.color,
      size: options.size
    })]
  });
}

function mixed(runs, options = {}) {
  return new Paragraph({
    spacing: { after: options.after ?? 130, line: 280 },
    alignment: options.alignment,
    keepNext: options.keepNext,
    children: runs
  });
}

function labelRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        borders, width: { size: 1650, type: WidthType.DXA },
        shading: { fill: light, type: ShadingType.CLEAR },
        margins: { top: 90, bottom: 90, left: 110, right: 110 },
        children: [p(label, { bold: true, color: green, after: 0 })]
      }),
      new TableCell({
        borders, width: { size: 7410, type: WidthType.DXA },
        margins: { top: 90, bottom: 90, left: 110, right: 110 },
        children: [p(value, { after: 0 })]
      })
    ]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "relief", level: 0 },
    spacing: { after: 90, line: 270 },
    children: [new TextRun(text)]
  });
}

const children = [
  p("DRAFT FOR REVIEW — NOT SENT", { bold: true, color: gold, size: 20, alignment: AlignmentType.CENTER, after: 90 }),
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { after: 90 },
    children: [new TextRun("Administrative Appeal of Constructive FOIL Denials")]
  }),
  p("Two requests dated August 4, 2026", { bold: true, color: gray, alignment: AlignmentType.CENTER, after: 260 }),
  new Table({
    width: { size: 9060, type: WidthType.DXA },
    columnWidths: [1650, 7410],
    rows: [
      labelRow("Date", "September 15, 2026"),
      labelRow("To", "FOIL Appeals Officer, if designated; otherwise Mayor Marc D. Citrin and the Village of Tuxedo Park Board of Trustees, as head, chief executive, or governing body of the agency"),
      labelRow("Via email", "mcitrin@tuxedopark-ny.gov; mlindsay@tuxedopark-ny.gov; jscherer@tuxedopark-ny.gov; jturner@tuxedopark-ny.gov; mtinari@tuxedopark-ny.gov"),
      labelRow("Copies", "Rachel Guido, Records Access Officer; Chief Allen Faust; Village Attorney; New York State Committee on Open Government"),
      labelRow("From", "David McFadden and Robin McFadden, 28 Pepperidge Road, Tuxedo Park, NY 10987"),
      labelRow("Subject", "Administrative appeal of constructive denials of August 4, 2026 Village and Police Department FOIL requests")
    ]
  }),
  p("", { after: 110 }),
  p("Dear FOIL Appeals Officer, Mayor Citrin, and Members of the Board of Trustees:"),
  mixed([
    new TextRun("Pursuant to Public Officers Law §89(4)(a), we appeal the Village of Tuxedo Park’s constructive denials of two Freedom of Information Law requests submitted on August 4, 2026."),
    new FootnoteReferenceRun(1)
  ]),
  p("This consolidated appeal concerns: (1) the Village administrative request seeking records about the proposed photography/filming law, Chapter 51, comparable photography uses, the boathouse property at 61 Turtle Point Road, and related assessment records; and (2) the Police Department request seeking complaints, calls for service, communications, and enforcement records concerning private-property photography and filming."),

  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Village administrative request")] }),
  p("The administrative request was sent on August 4, 2026 to Rachel Guido in her capacity as Village Clerk/Treasurer and Records Access Officer. In a letter dated August 5, Ms. Guido acknowledged receipt and stated that the request was anticipated to be granted or denied, in whole or in part, within 20 business days of that letter."),
  p("That stated period expired on or about September 2, 2026. As of the date of this appeal, we have received no responsive records, written denial, written explanation for an additional delay, or new date certain for production. The Village therefore failed to conform to Public Officers Law §89(3)(a), which constitutes a denial under §89(4)(a)."),

  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Police Department request")] }),
  p("The Police Department request was sent on August 4, 2026 to Chief Allen Faust at police@tuxedopark-ny.gov, with the Village Records Access Officer copied. The Village therefore had written notice of the request. No acknowledgment, production, written denial, or approximate response date has been received."),
  mixed([
    new TextRun("Public Officers Law §89(3)(a) requires an agency, within five business days after receipt of a reasonably described written request, to make the record available, deny the request in writing, or furnish a written acknowledgment with a reasonable approximate date for granting or denying the request. Failure to comply constitutes a constructive denial."),
    new FootnoteReferenceRun(2)
  ]),
  p("This appeal is being submitted promptly after we received confirmation that the continuing nonresponse may be appealed. To the extent the Village contends that an appeal from the Police Department’s nonresponse should have been filed earlier, we request that it accept this appeal as timely because no written denial, acknowledgment, appeal instructions, or identification of an appeals officer was provided, and the nonresponse remains ongoing."),

  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Independent open-government review")] }),
  p("On September 15, 2026, Axel Ebermann of the New York Coalition for Open Government reviewed the timeline and wrote:"),
  p("“Based on the timeline you provided, the Village is now past its deadline on both requests.”", { bold: true, color: green }),
  p("“I would file an appeal now on both requests. There is no reason to wait until Thursday.”", { bold: true, color: green }),
  p("Mr. Ebermann further wrote: “Once the appeal is received, the Village has 10 business days to respond in writing. If it does not, that is another deemed denial and you can consider an Article 78 proceeding.” He also advised requesting rolling production so that readily available records are not withheld while older material is being located. The Coalition’s response is advisory and is attached as Exhibit D."),

  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Request to adjourn the September 17 hearing")] }),
  p("Because the outstanding records concern the origin, factual basis, drafting, scope, and intended enforcement of the proposed law, we respectfully request that the Board adjourn the September 17 public hearing and defer any vote or other action until the Village has produced the responsive records on a rolling basis and residents have had a reasonable opportunity to review them."),
  p("If the Board proceeds on September 17, please include this appeal and all supporting exhibits in the public-hearing and legislative record and keep the hearing open until the overdue records have been produced and reviewed. We recognize that FOIL itself does not automatically require the Board to postpone the hearing; this request is made to protect an informed, transparent, and fair public process."),

  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Relief requested")] }),
  p("We respectfully request that the appeal recipient:"),
  bullet("Accept this consolidated appeal and reverse both constructive denials;"),
  bullet("Direct the immediate production of all readily available responsive records and require rolling production as additional records are located and reviewed;"),
  bullet("Adjourn the September 17 public hearing and defer any vote or other action until the responsive records have been produced and residents have had a reasonable opportunity to review them, or, at minimum, keep the hearing open;"),
  bullet("For any withheld or redacted material, identify the record or category and provide the specific statutory basis for withholding, while disclosing all reasonably segregable nonexempt portions;"),
  bullet("For any requested record the Village does not possess or cannot locate after diligent search, provide the certification authorized by Public Officers Law §89(3)(a);"),
  bullet("Identify a date certain for completing each production and the official responsible for each request;"),
  bullet("Preserve all responsive records, communications, attachments, photographs, videos, electronically stored information, and associated metadata;"),
  bullet("Immediately forward a copy of this appeal and the ensuing determination to the Committee on Open Government, as required by Public Officers Law §89(4)(a); and"),
  bullet("Issue the written appeal determination within 10 business days after receipt, either providing access or fully explaining any continued denial."),

  mixed([
    new TextRun("New York’s official FOIL guidance states that failure to respond within the applicable time, or failure to meet a promised production date without a proper written extension, may constitute a constructive denial. It also states that an appeal recipient must provide access or fully explain a further denial within 10 business days."),
    new FootnoteReferenceRun(3)
  ]),
  p("Please confirm receipt of this appeal and identify the person or body responsible for deciding it. This appeal does not narrow either underlying request, waive any right to challenge a final or constructive denial, or consent to further delay."),
  p("Respectfully,"),
  p("David McFadden and Robin McFadden", { bold: true, after: 40 }),
  mixed([
    new TextRun({ text: "28 Pepperidge Road", break: 0 }),
    new TextRun({ text: "Tuxedo Park, New York 10987", break: 1 }),
    new TextRun({ text: "mac4tux@gmail.com", break: 1 }),
    new TextRun({ text: "(917) 576-2484", break: 1 })
  ], { after: 260 }),

  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Proposed exhibits")] }),
  bullet("Exhibit A — August 4, 2026 Village Administrative FOIL Request"),
  bullet("Exhibit B — August 4, 2026 Police Records FOIL Request"),
  bullet("Exhibit C — August 5, 2026 Village Clerk/Records Access Officer Acknowledgment"),
  bullet("Exhibit D — September 15, 2026 New York Coalition for Open Government response"),
  p("Review note: Confirm the Village’s formally designated FOIL appeals officer, if any, and all recipient email addresses immediately before sending. Because the matter may proceed to an Article 78 proceeding, legal counsel should review the final appeal and all limitations-period calculations.", { italics: true, color: gray, size: 19 })
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 21, color: "1F2B27" } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Arial", size: 32, bold: true, color: green },
        paragraph: { spacing: { before: 0, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Arial", size: 25, bold: true, color: green },
        paragraph: { spacing: { before: 220, after: 90 }, outlineLevel: 1, keepNext: true }
      }
    ]
  },
  numbering: {
    config: [{
      reference: "relief",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 280 } } }
      }]
    }]
  },
  footnotes: {
    1: { children: [mixed([
      new TextRun("New York Public Officers Law §89(4)(a), "),
      new ExternalHyperlink({
        link: "https://www.nysenate.gov/legislation/laws/PBO/89",
        children: [new TextRun({ text: "https://www.nysenate.gov/legislation/laws/PBO/89", style: "Hyperlink" })]
      })
    ], { after: 0 })] },
    2: { children: [mixed([
      new TextRun("New York Public Officers Law §89(3)(a) and §89(4)(a), "),
      new ExternalHyperlink({
        link: "https://www.nysenate.gov/legislation/laws/PBO/89",
        children: [new TextRun({ text: "https://www.nysenate.gov/legislation/laws/PBO/89", style: "Hyperlink" })]
      })
    ], { after: 0 })] },
    3: { children: [mixed([
      new TextRun("New York State Committee on Open Government, “Explanation of Time Limits for Response,” "),
      new ExternalHyperlink({
        link: "https://opengovernment.ny.gov/explanation-time-limits-response",
        children: [new TextRun({ text: "https://opengovernment.ny.gov/explanation-time-limits-response", style: "Hyperlink" })]
      })
    ], { after: 0 })] }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 800, right: 1400, bottom: 850, left: 1400 }
      }
    },
    headers: {
      default: new Header({
        children: [p("TUXEDO PARK RIGHTS  /  FOIL APPEAL DRAFT", { bold: true, color: gray, size: 16, alignment: AlignmentType.RIGHT, after: 0 })]
      })
    },
    footers: {
      default: new Footer({
        children: [mixed([
          new TextRun({ text: "Draft for review · September 15, 2026                                      Page ", color: gray, size: 16 }),
          new TextRun({ children: [PageNumber.CURRENT], color: gray, size: 16 }),
          new TextRun({ text: " of ", color: gray, size: 16 }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], color: gray, size: 16 })
        ], { alignment: AlignmentType.CENTER, after: 0 })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUT, buffer);
  console.log(OUT);
});
