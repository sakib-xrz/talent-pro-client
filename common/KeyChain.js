import {
  BookmarkIcon,
  BuildingOffice2Icon,
  DocumentDuplicateIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const AUTH_TOKEN_KEY = "@AUTH_TOKEN";

export const IndustryOptions = [
  { label: "Aerospace And Defense", value: "AEROSPACE_AND_DEFENSE" },
  { label: "Agriculture", value: "AGRICULTURE" },
  { label: "Architecture And Design", value: "ARCHITECTURE_AND_DESIGN" },
  { label: "Art And Culture", value: "ART_AND_CULTURE" },
  { label: "Automotive", value: "AUTOMOTIVE" },
  { label: "Biotechnology", value: "BIOTECHNOLOGY" },
  { label: "Consulting", value: "CONSULTING" },
  { label: "Consumer Electronics", value: "CONSUMER_ELECTRONICS" },
  { label: "E-Commerce", value: "E_COMMERCE" },
  { label: "Education", value: "EDUCATION" },
  { label: "Energy And Utilities", value: "ENERGY_AND_UTILITIES" },
  { label: "Entertainment And Media", value: "ENTERTAINMENT_AND_MEDIA" },
  { label: "Environmental Services", value: "ENVIRONMENTAL_SERVICES" },
  { label: "Fashion And Apparel", value: "FASHION_AND_APPAREL" },
  { label: "Financial Services", value: "FINANCIAL_SERVICES" },
  { label: "Food And Beverage", value: "FOOD_AND_BEVERAGE" },
  {
    label: "Government And Public Administration",
    value: "GOVERNMENT_AND_PUBLIC_ADMINISTRATION",
  },
  { label: "Hospitality And Tourism", value: "HOSPITALITY_AND_TOURISM" },
  { label: "Information Technology", value: "INFORMATION_TECHNOLOGY" },
  { label: "Insurance", value: "INSURANCE" },
  {
    label: "Legal And Professional Services",
    value: "LEGAL_AND_PROFESSIONAL_SERVICES",
  },
  { label: "Manufacturing", value: "MANUFACTURING" },
  { label: "Mining And Metals", value: "MINING_AND_METALS" },
  {
    label: "Nonprofit And Social Services",
    value: "NONPROFIT_AND_SOCIAL_SERVICES",
  },
  {
    label: "Real Estate And Construction",
    value: "REAL_ESTATE_AND_CONSTRUCTION",
  },
  { label: "Retail", value: "RETAIL" },
  { label: "Sports And Fitness", value: "SPORTS_AND_FITNESS" },
  { label: "Telecommunications", value: "TELECOMMUNICATIONS" },
  {
    label: "Transportation And Logistics",
    value: "TRANSPORTATION_AND_LOGISTICS",
  },
];

export const CompanySizeOptions = [
  { label: "1 - 50 employees", value: "1-50" },
  { label: "51 - 200 employees", value: "51-200" },
  { label: "201 - 1,000 employees", value: "201-1000" },
];

export const EmployStatus = [
  { label: "Employed", value: "EMPLOYED" },
  { label: "Internship", value: "INTERNSHIP" },
  { label: "Unemployed", value: "UNEMPLOYED" },
];

export const EmploymentType = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
  { label: "Intern", value: "INTERN" },
];

export const ExperienceLevel = [
  { label: "Entry Level", value: "ENTRY" },
  { label: "Mid Level", value: "MID" },
  { label: "Senior Level", value: "SENIOR" },
];

export const LocationType = [
  { label: "Onsite", value: "ONSITE" },
  { label: "Hybrid", value: "HYBRID" },
  { label: "Remote", value: "REMOTE" },
];

export const WeekDay = [
  { label: "Sunday", value: "SUNDAY" },
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
];

export const SortOptions = [
  { label: "Newest", value: "descending" },
  { label: "Oldest", value: "ascending" },
];

export const JobOptions = [
  { label: "Published", value: "PUBLISHED" },
  { label: "Unpublished", value: "UNPUBLISHED" },
  { label: "On Hold", value: "ON_HOLD" },
  { label: "Closed", value: "CLOSED" },
];

export const navOptions = [
  {
    icon: UserIcon,
    name: "My Profile",
    href: "/candidate/my-profile/info",
  },
  {
    icon: DocumentDuplicateIcon,
    name: "My Applications",
    href: "/candidate/my-applications",
  },
  {
    icon: BookmarkIcon,
    name: "Saved Jobs",
    href: "/candidate/saved-jobs",
  },
];

export const recruiterNavOptions = [
  {
    name: "My Profile",
    href: "/recruiter/my-profile",
    icon: UserIcon,
  },
  {
    name: "My Organization",
    href: "/recruiter/organization",
    icon: BuildingOffice2Icon,
  },
];
