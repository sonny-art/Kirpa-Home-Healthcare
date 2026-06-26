import { SITE, SERVICE_GROUPS } from "./site";

/**
 * Structured data (schema.org) for SEO / rich results.
 * Only facts verified on the original site are included.
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    telephone: "+1-703-939-5287",
    email: SITE.email,
    image: `${SITE.url}/images/care-1.jpg`,
    logo: `${SITE.url}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: SITE.address.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Virginia",
      },
    },
    // Verified on the About page: care professionals available 24/7.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "24:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home care services",
      itemListElement: SERVICE_GROUPS.map((g) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: g.title, description: g.blurb },
      })),
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
