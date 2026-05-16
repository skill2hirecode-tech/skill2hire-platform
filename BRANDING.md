# Skill2Hire Technologies - Branding Guidelines

## 🎨 Official Logo

### Logo Files
The official S2H logo is available in the following formats:

- **`/frontend/public/images/s2h-logo.svg`** - Primary logo icon (for navbar, footer, general use)
- **`/frontend/public/images/s2h-logo-full.svg`** - Full logo with text and tagline (for marketing, social media)
- **`/frontend/public/favicon.svg`** - Favicon version (for browser tabs)

### Logo Design Elements

The S2H logo consists of three core elements that represent our brand values:

1. **Blue "S" with Person Figure** (`#1E88E5`)
   - Represents "Skill" and human empowerment
   - Features a stylized person with raised arm symbolizing growth and achievement
   - Smooth, flowing curves representing adaptability and progress

2. **Green "2"** (`#28A745`)
   - Represents the bridge/connection between skills and opportunities
   - Symbolizes growth, success, and positive transformation
   - Central element that ties Skill to Hire

3. **Navy "H"** (`#1A3A52`)
   - Represents "Hire" and professional opportunities
   - Solid, structured design symbolizing stability and trust
   - Professional appearance for corporate credibility

## 📝 Brand Name Usage

### Correct Format
**Always use:** Skill**2**Hire Technologies

### In HTML/React/JSX:
```tsx
<div className="text-xl font-bold text-navy">
  Skill<span className="text-secondary">2</span>Hire
</div>
<div className="text-xs text-primary font-medium">Technologies</div>
```

### Text Styling Rules:
- **"Skill"** - Navy color (#1A3A52)
- **"2"** - Green color (#28A745) - ALWAYS highlighted
- **"Hire"** - Navy color (#1A3A52)
- **"Technologies"** - Blue color (#1E88E5) or gray for subtlety

### DO NOT:
❌ Write as "S2H" in formal communications (use full name)
❌ Omit "Technologies" from the official brand name
❌ Use different colors for the "2"
❌ Separate "Skill", "2", and "Hire" with spaces

## 🎨 Brand Colors

### Primary Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary Blue** | `#1E88E5` | Primary actions, links, "S" in logo, "Technologies" text |
| **Secondary Green** | `#28A745` | Success states, CTAs, "2" in logo and text |
| **Navy** | `#1A3A52` | Text, headers, "H" in logo, body copy |

### Supporting Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| **White** | `#FFFFFF` | Backgrounds, text on dark backgrounds |
| **Light Gray** | `#F8F9FA` | Section backgrounds |
| **Medium Gray** | `#6C757D` | Secondary text |
| **Dark Gray** | `#343A40` | Body text alternative |

### Gradient (Optional)
```css
background: linear-gradient(135deg, #1E88E5 0%, #28A745 100%);
```

## ✍️ Typography

### Primary Font
**Poppins** (Google Fonts)

### Font Weights Used:
- **300** - Light (minimal use)
- **400** - Regular (body text)
- **500** - Medium (subheadings)
- **600** - Semi-bold (emphasis)
- **700** - Bold (headings)
- **800** - Extra-bold (hero titles)

### Font Usage:
```css
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

## 💬 Brand Tagline

### Official Tagline:
**"Connecting Talent with Opportunity"**

### Usage:
- Below the logo in marketing materials
- Hero section of website
- Email signatures
- Social media bios
- Meta descriptions

### Alternative taglines (context-specific):
- "Empowering Careers, Enabling Growth"
- "Your Partner in Talent Development"
- "Skills Today, Opportunities Tomorrow"

## 📐 Logo Usage Guidelines

### ✅ DO:
- Use official logo files only
- Maintain clear space around the logo (minimum 20px)
- Use on white or light backgrounds for best visibility
- Scale proportionally (maintain aspect ratio)
- Use high-resolution SVG files when possible
- Display "2" in green when showing brand name

### ❌ DON'T:
- Distort, stretch, or skew the logo
- Change logo colors or individual element colors
- Add effects (shadows, outlines, glows)
- Rotate the logo
- Separate the S, 2, and H elements
- Place on busy or low-contrast backgrounds
- Use pixelated or low-resolution versions

## 💻 Implementation Examples

### Navbar Logo (React/Next.js)
```tsx
import Image from 'next/image';

<Link href="/" className="flex items-center space-x-3">
  <div className="relative w-16 h-16">
    <Image 
      src="/images/s2h-logo.svg" 
      alt="Skill2Hire Technologies" 
      width={64} 
      height={64}
      className="object-contain"
      priority
    />
  </div>
  <div>
    <div className="text-xl font-bold text-navy">
      Skill<span className="text-secondary">2</span>Hire
    </div>
    <div className="text-xs text-primary font-medium">Technologies</div>
  </div>
</Link>
```

### Footer Logo
```tsx
<div className="flex items-center space-x-3">
  <Image 
    src="/images/s2h-logo.svg" 
    alt="Skill2Hire Technologies" 
    width={56} 
    height={56}
    className="object-contain"
  />
  <div>
    <div className="font-bold text-lg">
      Skill<span className="text-secondary">2</span>Hire
    </div>
    <div className="text-xs text-secondary font-medium">Technologies</div>
  </div>
</div>
```

### Favicon in HTML
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/svg+xml" href="/images/s2h-logo.svg" sizes="64x64">
```

## 📱 Social Media Guidelines

### Profile Pictures
- Use `s2h-logo.svg` on white background
- Minimum size: 400x400px
- Ensure logo is centered with adequate padding

### Cover Images
- Use `s2h-logo-full.svg` with tagline
- Recommended size: 1200x630px (Facebook/LinkedIn)
- Twitter: 1500x500px

### Posts & Content
- Always include logo in branded content
- Use brand colors in graphics
- Include tagline when space permits
- Use #Skill2Hire hashtag

### Recommended Hashtags
- `#Skill2Hire`
- `#Skill2HireTechnologies`
- `#ConnectingTalentWithOpportunity`
- `#SkillDevelopment`
- `#CareerGrowth`

## 📧 Email Signature

```
[S2H Logo]

Your Name
Position
Skill2Hire Technologies

📧 your.email@skill2hiretechnologies.com
📱 +91 82203 33917
🌐 www.skill2hiretechnologies.com

Connecting Talent with Opportunity
```

## 🏢 Business Card Layout

**Front:**
- S2H logo (top left or centered)
- "Skill2Hire Technologies" with green "2"
- Tagline

**Back:**
- Contact information
- Social media handles
- Website URL
- QR code (optional)

## 📄 Document Headers

### Letterhead
- Logo top left
- Company name: Skill2Hire Technologies
- Tagline below logo
- Contact info in footer

### Presentations
- Logo on every slide (top right, small)
- Title slide: Full logo with tagline
- Brand colors for backgrounds and accents

## 🎯 Brand Voice & Tone

### Our Voice:
- **Professional** yet approachable
- **Empowering** and motivational
- **Expert** but not condescending
- **Clear** and concise
- **Action-oriented**

### Tone Guidelines:
- **For Job Seekers:** Encouraging, supportive, empowering
- **For Employers:** Professional, efficient, results-driven
- **For Students:** Motivational, educational, friendly
- **General:** Inclusive, positive, solution-focused

## 📞 Contact Information

**Skill2Hire Technologies**

📍 Address: #123, Koramangala, Bangalore, Karnataka - 560034, India

📧 Email: info@skill2hiretechnologies.com

📱 Phone: +91 82203 33917

🌐 Website: www.skill2hiretechnologies.com

💼 LinkedIn: /company/skill2hire-technologies

---

## Version Control

**Document Version:** 1.0  
**Last Updated:** May 2026  
**Maintained by:** Marketing & Brand Team  
**Review Schedule:** Quarterly

For questions or custom logo formats, contact: info@skill2hiretechnologies.com
