import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "kirpahhc@gmail.com";
const FROM =
  process.env.CONTACT_FROM_EMAIL ||
  "Kirpa Home Health Care <onboarding@resend.dev>";

const PDF_PATH = path.join(
  process.cwd(),
  "public",
  "Kirpa-Employment-Application-Fillable.pdf"
);

// Semantic key → text field name in the fillable PDF (f001–f164).
const TEXT_FIELDS: Record<string, string> = {
  fullName: "f001",
  date: "f002",
  address: "f003",
  city: "f004",
  state: "f005",
  zip: "f006",
  email: "f007",
  phone: "f008",
  ssn: "f009",
  dateAvailable: "f010",
  desiredPay: "f011",
  position: "f014",
  workedBeforeDates: "f024",
  felonyExplain: "f027",
  hsName: "f028",
  hsCityState: "f029",
  hsFrom: "f030",
  hsTo: "f031",
  hsDiploma: "f034",
  collegeName: "f035",
  collegeCityState: "f036",
  collegeFrom: "f037",
  collegeTo: "f038",
  collegeDegree: "f041",
  other1Name: "f042",
  other1CityState: "f043",
  other1From: "f044",
  other1To: "f045",
  other1Degree: "f046",
  other2Name: "f047",
  other2CityState: "f048",
  other2From: "f049",
  other2To: "f050",
  other2Degree: "f051",
  emp1Name: "f052",
  emp1Email: "f053",
  emp1Phone: "f054",
  emp1Address: "f055",
  emp1City: "f056",
  emp1State: "f057",
  emp1Zip: "f058",
  emp1StartPay: "f059",
  emp1EndPay: "f062",
  emp1Title: "f065",
  emp1Responsibilities: "f066",
  emp1StartDate: "f067",
  emp1EndDate: "f068",
  emp1Reason: "f069",
  emp2Name: "f070",
  emp2Email: "f071",
  emp2Phone: "f072",
  emp2Address: "f073",
  emp2City: "f074",
  emp2State: "f075",
  emp2Zip: "f076",
  emp2StartPay: "f077",
  emp2EndPay: "f080",
  emp2Title: "f083",
  emp2Responsibilities: "f084",
  emp2StartDate: "f085",
  emp2EndDate: "f086",
  emp2Reason: "f087",
  emp3Name: "f088",
  emp3Email: "f089",
  emp3Phone: "f090",
  emp3Address: "f091",
  emp3City: "f092",
  emp3State: "f093",
  emp3Zip: "f094",
  emp3StartPay: "f095",
  emp3EndPay: "f098",
  emp3Title: "f101",
  emp3Responsibilities: "f102",
  emp3StartDate: "f103",
  emp3EndDate: "f104",
  emp3Reason: "f105",
  ref1Name: "f106",
  ref1Relationship: "f107",
  ref1Company: "f108",
  ref1Title: "f109",
  ref1Email: "f110",
  ref1Phone: "f111",
  ref2Name: "f112",
  ref2Relationship: "f113",
  ref2Company: "f114",
  ref2Title: "f115",
  ref2Email: "f116",
  ref2Phone: "f117",
  ref3Name: "f118",
  ref3Relationship: "f119",
  ref3Company: "f120",
  ref3Title: "f121",
  ref3Email: "f122",
  ref3Phone: "f123",
  militaryBranch: "f126",
  militaryRank: "f127",
  militaryStartDate: "f128",
  militaryEndDate: "f129",
  militaryDischargeType: "f130",
  militaryDischargeExplain: "f131",
  bgLastName: "f132",
  bgFirstName: "f133",
  bgMiddleInitial: "f134",
  bgSsn: "f135",
  bgDlNumber: "f136",
  bgDlState: "f137",
  bgBirthDate: "f138",
  bgPhone: "f139",
  bgLicenseType: "f140",
  bgLicenseState: "f141",
  bgLicenseNumber: "f142",
  bgLicenseExpiration: "f143",
  bgPreviousNames: "f144",
  bgPreviousNamesDate: "f145",
  bgAddr1: "f146",
  bgAddr1City: "f147",
  bgAddr1State: "f148",
  bgAddr1Zip: "f149",
  bgAddr1County: "f150",
  bgAddr2: "f151",
  bgAddr2City: "f152",
  bgAddr2State: "f153",
  bgAddr2Zip: "f154",
  bgAddr2County: "f155",
  bgAddr3: "f156",
  bgAddr3City: "f157",
  bgAddr3State: "f158",
  bgAddr3Zip: "f159",
  bgAddr3County: "f160",
  signature: "f161",
  signatureDate: "f162",
  printedName: "f163",
  printedSsn: "f164",
};

// Semantic key → { answer value → checkbox field name }.
const CHECK_FIELDS: Record<string, Record<string, string>> = {
  payType: { hour: "f012", salary: "f013" },
  employmentDesired: { "full-time": "f015", "part-time": "f016", seasonal: "f017" },
  usCitizen: { yes: "f018", no: "f019" },
  allowedToWork: { yes: "f020", no: "f021" },
  workedBefore: { yes: "f022", no: "f023" },
  felony: { yes: "f025", no: "f026" },
  hsGraduate: { yes: "f032", no: "f033" },
  collegeGraduate: { yes: "f039", no: "f040" },
  emp1PayType: { hour: "f060", salary: "f061" },
  emp1EndPayType: { hour: "f063", salary: "f064" },
  emp2PayType: { hour: "f078", salary: "f079" },
  emp2EndPayType: { hour: "f081", salary: "f082" },
  emp3PayType: { hour: "f096", salary: "f097" },
  emp3EndPayType: { hour: "f099", salary: "f100" },
  veteran: { yes: "f124", no: "f125" },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function oneLine(s: unknown, max = 300) {
  return String(s ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function todayUS() {
  return new Date().toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

async function fillPdf(data: Record<string, string>): Promise<Uint8Array> {
  const doc = await PDFDocument.load(await fs.readFile(PDF_PATH));
  const form = doc.getForm();

  for (const [key, fieldName] of Object.entries(TEXT_FIELDS)) {
    const value = data[key];
    if (!value) continue;
    try {
      const field = form.getTextField(fieldName);
      field.setFontSize(9);
      field.setText(value);
    } catch {
      // Skip a field that can't be written rather than losing the application.
    }
  }

  for (const [key, options] of Object.entries(CHECK_FIELDS)) {
    const fieldName = options[data[key]];
    if (!fieldName) continue;
    try {
      form.getCheckBox(fieldName).check();
    } catch {
      // Same: never fail the whole submission over one checkbox.
    }
  }

  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  form.updateFieldAppearances(helvetica);
  form.flatten();
  return doc.save();
}

function summaryHtml(data: Record<string, string>) {
  const rows: [string, string][] = [
    ["Full name", data.fullName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Position applied for", data.position],
    ["Employment desired", data.employmentDesired],
    ["Date available", data.dateAvailable],
    ["Signed (background check)", data.signature ? `Yes — ${data.signature}, ${data.signatureDate}` : "No"],
  ];
  const tr = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e2e8ee;font-weight:700;color:#14202e;white-space:nowrap;">${escapeHtml(k)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e2e8ee;color:#41525f;">${escapeHtml(v)}</td>
      </tr>`
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#004B8D;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0;">
        <div style="font-size:18px;font-weight:800;">Kirpa Home Health Care</div>
        <div style="font-size:14px;color:#cfe0f1;">New employment application</div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8ee;border-top:0;border-radius:0 0 14px 14px;padding:8px 10px;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">${tr}</table>
        <p style="color:#41525f;font-size:14px;padding:6px 14px 10px;">
          The completed application form is attached as a PDF.
        </p>
      </div>
      <p style="color:#6b7a87;font-size:12px;margin:16px 4px;">Submitted from the Kirpa Home Health Care website careers page.</p>
    </div>
  </body></html>`;
}

type Payload = {
  data?: Record<string, unknown>;
  // Honeypot — bots fill this; humans never see it.
  company?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept (so bots think they succeeded) but do nothing.
  if (body.company && String(body.company).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const raw = body.data && typeof body.data === "object" ? body.data : {};
  const data: Record<string, string> = {};
  for (const key of [...Object.keys(TEXT_FIELDS), ...Object.keys(CHECK_FIELDS)]) {
    const v = oneLine(raw[key]);
    if (v) data[key] = v;
  }

  if (!data.fullName || !data.phone || !EMAIL_RE.test(data.email || "")) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, and a valid email are required." },
      { status: 400 }
    );
  }
  if (!data.signature) {
    return NextResponse.json(
      { ok: false, error: "Please type your signature to authorize the application." },
      { status: 400 }
    );
  }

  // Server-side derived values: dates, background-check identity fields, and
  // copies the paper form asks for twice.
  data.date = todayUS();
  data.signatureDate = todayUS();
  data.printedName = data.printedName || data.fullName;
  data.printedSsn = data.printedSsn || data.ssn || "";
  data.bgSsn = data.bgSsn || data.ssn || "";
  data.bgPhone = data.bgPhone || data.phone;
  const nameParts = data.fullName.split(/\s+/);
  data.bgFirstName = data.bgFirstName || nameParts[0];
  data.bgLastName = data.bgLastName || (nameParts.length > 1 ? nameParts[nameParts.length - 1] : "");
  data.bgMiddleInitial =
    data.bgMiddleInitial || (nameParts.length > 2 ? nameParts[1][0].toUpperCase() : "");
  // Current address doubles as the first entry of the address history.
  data.bgAddr1 = data.bgAddr1 || data.address || "";
  data.bgAddr1City = data.bgAddr1City || data.city || "";
  data.bgAddr1State = data.bgAddr1State || data.state || "";
  data.bgAddr1Zip = data.bgAddr1Zip || data.zip || "";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client so it can offer the download fallback.
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  let pdfBase64: string;
  try {
    pdfBase64 = Buffer.from(await fillPdf(data)).toString("base64");
  } catch (err) {
    console.error("PDF fill failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not generate the application PDF." },
      { status: 500 }
    );
  }

  const nameSlug = data.fullName.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "Applicant";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `[Website] Job application — ${oneLine(data.fullName, 80)}${data.position ? ` (${oneLine(data.position, 60)})` : ""}`,
      replyTo: data.email,
      html: summaryHtml(data),
      attachments: [
        { filename: `Kirpa-Employment-Application-${nameSlug}.pdf`, content: pdfBase64 },
      ],
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Email could not be sent." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send failed:", err);
    return NextResponse.json({ ok: false, error: "Email could not be sent." }, { status: 502 });
  }
}
