"""Build the current resume in the one-column Harman-style layout.

The source remains LaTeX for Overleaf/editing, while this ReportLab builder
keeps the local preview reproducible when a TeX distribution is unavailable.
"""

import os
import shutil
from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "Sarvesh_Patil_Resume.pdf"

FA_SOLID = Path(
    "/Users/patilsarvesh/Library/Application Support/Google/Chrome/Default/"
    "Extensions/hdpcadigjkbcpnlcpbcohpafiaefanki/7.5.0_0/font/fa-solid-900.ttf"
)
FA_BRANDS = Path(
    "/Users/patilsarvesh/Library/Application Support/Google/Chrome/Default/"
    "Extensions/hdpcadigjkbcpnlcpbcohpafiaefanki/7.5.0_0/font/fa-brands-400.ttf"
)


def register_fonts():
    if FA_SOLID.exists():
        pdfmetrics.registerFont(TTFont("FA-Solid", str(FA_SOLID)))
    if FA_BRANDS.exists():
        pdfmetrics.registerFont(TTFont("FA-Brands", str(FA_BRANDS)))


def text_width(value, font, size):
    return pdfmetrics.stringWidth(value, font, size)


def draw_link(c, x, y, label, url, font="Times-Roman", size=10, icon=None, icon_font=None):
    """Draw underlined link text and add a clickable URI annotation."""
    cursor = x
    if icon:
        chosen_font = icon_font or font
        c.setFont(chosen_font, size)
        c.drawString(cursor, y, icon)
        cursor += text_width(icon, chosen_font, size) + 3
    c.setFont(font, size)
    c.drawString(cursor, y, label)
    width = cursor - x + text_width(label, font, size)
    c.setLineWidth(0.55)
    c.line(x, y - 1.5, x + width, y - 1.5)
    c.linkURL(url, (x - 1, y - 3, x + width + 1, y + size + 2), relative=0, thickness=0)
    return x + width


def draw_section(c, y, title, left=42, right=570):
    y -= 5
    c.setFillColorRGB(0, 0, 0)
    c.setFont("Times-Bold", 12.8)
    c.drawString(left, y, title.upper())
    y -= 4
    c.setLineWidth(0.55)
    c.line(left, y, right, y)
    return y - 11


def draw_wrapped(c, x, y, value, width, font="Times-Roman", size=9.55, leading=11.25):
    c.setFont(font, size)
    lines = simpleSplit(value, font, size, width)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_bullet(c, y, value, left=54, text_x=68, width=500, size=9.55, leading=11.2):
    c.setFont("Times-Roman", size + 0.2)
    c.drawString(left, y, u"\u2022")
    return draw_wrapped(c, text_x, y, value, width, size=size, leading=leading) - 1.5


def draw_experience(c, y, company, url, dates, role, location, bullets):
    c.setFont("Times-Bold", 11.9)
    company_width = text_width(company, "Times-Bold", 11.9)
    c.drawString(42, y, company)
    c.setFont("FA-Solid", 10)
    c.drawString(42 + company_width + 3, y + 1, u"\uf35d")
    c.linkURL(url, (41, y - 3, 42 + company_width + 15, y + 14), relative=0, thickness=0)
    c.setFont("Times-Bold", 11.2)
    c.drawRightString(570, y, dates)
    y -= 16
    c.setFont("Times-Italic", 11.2)
    c.drawString(42, y, role)
    c.drawRightString(570, y, location)
    y -= 14
    for bullet in bullets:
        y = draw_bullet(c, y, bullet)
    return y - 3


def draw_project(c, y, name, url, stack, year, bullet):
    c.setFont("Times-Bold", 11.1)
    name_width = text_width(name, "Times-Bold", 11.1)
    c.drawString(42, y, name)
    c.setLineWidth(0.55)
    c.line(42, y - 1.5, 42 + name_width, y - 1.5)
    c.setFont("FA-Solid", 9.4)
    c.drawString(42 + name_width + 3, y + 1, u"\uf35d")
    c.linkURL(url, (41, y - 3, 42 + name_width + 15, y + 14), relative=0, thickness=0)
    c.setFont("Times-Roman", 11.0)
    c.drawString(42 + name_width + 20, y, "|  " + stack)
    c.setFont("Times-Bold", 10.8)
    c.drawRightString(570, y, year)
    return draw_bullet(c, y - 15, bullet, size=9.2, leading=10.8) - 2


def add_new_window_flags():
    """Preserve real URI links and request a new window where viewers support it."""
    from pypdf import PdfReader, PdfWriter
    from pypdf.generic import BooleanObject, NameObject

    reader = PdfReader(str(PDF_PATH))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    for page in writer.pages:
        for annotation in page.get("/Annots", []):
            obj = annotation.get_object()
            action = obj.get("/A")
            if action and action.get("/S") == "/URI":
                action[NameObject("/NewWindow")] = BooleanObject(True)
    temporary = PDF_PATH.with_suffix(".patched.pdf")
    with temporary.open("wb") as stream:
        writer.write(stream)
    os.replace(temporary, PDF_PATH)
    for target in [ROOT / "public" / PDF_PATH.name, ROOT / "output" / "pdf" / PDF_PATH.name]:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(PDF_PATH, target)


def build():
    register_fonts()
    c = canvas.Canvas(str(PDF_PATH), pagesize=LETTER, pageCompression=1)
    c.setTitle("Sarvesh Patil - Resume")
    c.setAuthor("Sarvesh Patil")
    c.setSubject("Senior Software Engineer Resume")
    y = 755

    c.setFont("Times-Roman", 28)
    c.drawCentredString(306, y, "SARVESH PATIL")
    y -= 20
    c.setFont("Times-Roman", 11.8)
    c.drawCentredString(306, y, "Bengaluru, Karnataka")
    y -= 19

    header_items = [
        ("+91-9448309720", "tel:+91-9448309720", "\uf095", "FA-Solid"),
        ("p.sarvesh.1111@gmail.com", "mailto:p.sarvesh.1111@gmail.com", "\uf0e0", "FA-Solid"),
        ("LinkedIn", "https://www.linkedin.com/in/patilsarvesh/", "\uf08c", "FA-Brands"),
        ("GitHub", "https://github.com/PatilSarvesh", "\uf09b", "FA-Brands"),
        ("Portfolio", "https://naughty-davinci-145c32.netlify.app/", None, None),
    ]
    widths = []
    for label, _, icon, icon_font in header_items:
        icon_width = text_width(icon, icon_font, 9.7) + 3 if icon else 0
        widths.append(icon_width + text_width(label, "Times-Roman", 9.7))
    gap = 10
    cursor = (612 - sum(widths) - gap * (len(widths) - 1)) / 2
    for (label, url, icon, icon_font), width in zip(header_items, widths):
        draw_link(c, cursor, y, label, url, size=9.7, icon=icon, icon_font=icon_font)
        cursor += width + gap

    y -= 18
    y = draw_section(c, y, "Summary")
    y = draw_wrapped(
        c,
        42,
        y,
        "Software Engineer building backend and cloud-native systems across Python, AWS, and .NET. Currently working in Python and AWS at Maximus GCC, shipping dependable services and practical AI infrastructure with clear contracts, observable behavior, and reliable delivery.",
        528,
        size=9.5,
        leading=11.05,
    )
    y -= 2

    y = draw_section(c, y, "Technical Skills")
    skills = [
        ("Programming Languages:", "Python, C#, TypeScript, JavaScript, SQL"),
        ("Cloud and AWS:", "Lambda, Step Functions, S3, Textract, Bedrock, SQS/SNS, EventBridge, Cognito, RDS, KMS, CloudWatch, X-Ray"),
        ("Backend and AI:", "ASP.NET Core, .NET, REST APIs, microservices, SQLAlchemy, Node.js, MCP, LLM integration, structured extraction, RAG"),
        ("Data and Delivery:", "PostgreSQL, MongoDB, MySQL/Aurora, SQL Server, Qdrant, Git, AWS SAM, Docker"),
        ("Testing:", "XUnit, Postman, GitHub Actions, ServiceNow ATF"),
        ("Frontend:", "React, Vue.js, Tailwind CSS"),
    ]
    for label, value in skills:
        c.setFont("Times-Bold", 9.5)
        c.drawString(42, y, label + " ")
        label_width = text_width(label + " ", "Times-Bold", 9.5)
        y = draw_wrapped(c, 42 + label_width, y, value, 528 - label_width, size=9.5, leading=10.9)
    y -= 2

    y = draw_section(c, y, "Experience")
    y = draw_experience(
        c,
        y,
        "Maximus GCC",
        "https://maximus.com",
        "May 2022 - Present",
        "Senior Software Engineer",
        "Bengaluru, India",
        [
            "Built and deployed Python services for a production, multi-tenant serverless Intelligent Document Processing (IDP) platform on AWS using Lambda, Step Functions, S3, Amazon Bedrock, and Textract.",
            "Engineered asynchronous Textract and Bedrock orchestration with Step Functions task tokens and SNS, eliminating polling; enforced strict JSON schemas for reliable extraction.",
            "Implemented KMS ECDSA-signed webhooks, human-in-the-loop review with session locking, and observability through X-Ray, CloudWatch alarms, and Splunk.",
            "Delivered ModelOps Python workflows and TalentLens features across React/Tailwind and .NET microservices; built MPC Correspondence and provider-credentialing integrations, improving template creation efficiency by 30% and cutting delivery time by 20%.",
        ],
    )
    y = draw_experience(
        c,
        y,
        "Accenture",
        "https://www.accenture.com/in-en",
        "Oct 2021 - May 2022",
        "Associate Software Engineer (ASE)",
        "Bengaluru, India",
        [
            "Trained and worked as a ServiceNow developer and ITOM specialist, developing workflows and frontend validations with Glide AJAX that improved efficiency by 15%.",
            "Implemented and tested pages and workflows with ServiceNow Automated Test Framework (ATF).",
        ],
    )

    y = draw_section(c, y, "Projects")
    projects = [
        ("AgentCargo", "https://github.com/PatilSarvesh/AgentCargo", "TypeScript, PostgreSQL, CLI", "In progress", "Building a cross-agent registry and package manager for reusable AI-agent skills with deterministic packaging, integrity verification, versioning, authentication, publishing, and installation."),
        ("Bridge", "https://github.com/PatilSarvesh/Bridge", "TypeScript, REST, MCP", "In progress", "Building a shared decision and specification control plane for AI-agent teams, centered on durable context, human authority, governed decisions, and auditable continuation."),
        ("ShortUrl", "https://github.com/PatilSarvesh/ShortUrl", "C#, .NET 8, MongoDB, React", "2024", "Shipped a URL-shortening product with custom links, expiry, redirect analytics, and a minimal API-backed interface."),
        ("CodeFusion", "https://github.com/PatilSarvesh/CodeFusion", "JavaScript, React", "2024", "Built a developer toolbox for data conversion, validation, inspection, and repeatable utility workflows across common formats and identifiers."),
    ]
    for project in projects:
        y = draw_project(c, y, *project)

    y = draw_section(c, y, "Education")
    c.setFont("Times-Bold", 11.2)
    education = "SEA College of Engineering and Technology (VTU)"
    education_width = text_width(education, "Times-Bold", 11.2)
    c.drawString(42, y, education)
    c.setFont("FA-Solid", 9.4)
    c.drawString(42 + education_width + 3, y + 1, u"\uf35d")
    c.linkURL("https://seacet.edu.in/", (41, y - 3, 42 + education_width + 15, y + 14), relative=0, thickness=0)
    c.setFont("Times-Bold", 10.8)
    c.drawRightString(570, y, "Aug 2017 - Jun 2021")
    y -= 15
    c.setFont("Times-Italic", 10.8)
    c.drawString(42, y, "B.E., Computer Science and Engineering - CGPA: 7.81")
    c.drawRightString(570, y, "Bengaluru, India")
    y -= 20

    y = draw_section(c, y, "Certifications")
    for item in [
        "Full Stack Web Development - Udemy",
        ".NET and React Development - Pratian Technologies",
        "MongoDB Basics",
    ]:
        y = draw_bullet(c, y, item, size=9.35, leading=10.8)

    c.save()
    add_new_window_flags()
    print(PDF_PATH)


if __name__ == "__main__":
    build()
