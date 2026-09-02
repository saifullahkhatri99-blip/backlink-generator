/**
 * NexusLink Pro - Platform Templates & Form Mapping Matrix
 * Supports major CMS, Forum engines, Web 2.0, and Profile platforms
 */

const PLATFORM_TEMPLATES = {
    xenforo: {
        name: "XenForo Community Forum",
        category: "Forum / Community",
        icon: "💬",
        fields: {
            username: ["user_name", "username", "login", "xf_user"],
            email: ["email", "user_email", "xf_email"],
            password: ["password", "user_password", "xf_pass"],
            website: ["custom_fields[website]", "website", "homepage", "url"],
            bio: ["about", "signature", "custom_fields[about_me]"],
            occupation: ["custom_fields[occupation]", "occupation", "job"]
        },
        endpoints: {
            register: "/register/register",
            login: "/login/login",
            profile_edit: "/account/account-details"
        }
    },
    discourse: {
        name: "Discourse Modern Community",
        category: "Forum / Web 2.0",
        icon: "🌐",
        fields: {
            username: ["username", "account_username"],
            email: ["email", "account_email"],
            password: ["password", "account_password"],
            website: ["website", "user_fields[website]"],
            bio: ["bio_raw", "about_me"]
        },
        endpoints: {
            register: "/users",
            login: "/session",
            profile_edit: "/u/{username}/preferences/profile"
        }
    },
    wordpress: {
        name: "WordPress / BuddyPress Social Profile",
        category: "Web 2.0 / Blog",
        icon: "📝",
        fields: {
            username: ["user_login", "signup_username"],
            email: ["user_email", "signup_email"],
            password: ["pass1", "pass2", "signup_password"],
            website: ["url", "user_url", "website"],
            bio: ["description", "bio", "user_bio"]
        },
        endpoints: {
            register: "/wp-login.php?action=register",
            login: "/wp-login.php",
            profile_edit: "/wp-admin/profile.php"
        }
    },
    phpbb: {
        name: "phpBB Classic Forum",
        category: "Forum / Profile",
        icon: "📋",
        fields: {
            username: ["username", "user_name"],
            email: ["email", "email_confirm"],
            password: ["new_password", "password_confirm"],
            website: ["website", "pf_phpbb_website"],
            bio: ["signature", "pf_phpbb_interests", "pf_phpbb_occupation"]
        },
        endpoints: {
            register: "/ucp.php?mode=register",
            login: "/ucp.php?mode=login",
            profile_edit: "/ucp.php?i=ucp_profile&mode=profile_info"
        }
    },
    mediawiki: {
        name: "MediaWiki / Wiki Profile",
        category: "Wiki / Authority",
        icon: "📚",
        fields: {
            username: ["wpName", "username"],
            email: ["wpEmail", "email"],
            password: ["wpPassword", "wpRetype"],
            bio: ["wpTextbox1", "user_page_content"]
        },
        endpoints: {
            register: "/index.php?title=Special:CreateAccount",
            login: "/index.php?title=Special:UserLogin",
            profile_edit: "/index.php?title=User:{username}&action=edit"
        }
    },
    generic_directory: {
        name: "High-DA Business Directory / Web Profile",
        category: "Directory / Citation",
        icon: "🏢",
        fields: {
            company: ["company_name", "business_name", "title"],
            website: ["website_url", "site_url", "target_url", "website"],
            email: ["contact_email", "email", "biz_email"],
            description: ["description", "about", "details", "bio"],
            tags: ["keywords", "tags", "categories"]
        },
        endpoints: {
            submit: "/submit-listing",
            register: "/register"
        }
    }
};

// Curated LSI Keyword Prefixes & Suffixes for SEO Variations
const KEYWORD_MODIFIERS = {
    prefixes: [
        "best", "top", "professional", "reliable", "affordable", "cheap", "ultimate", "fast",
        "verified", "custom", "expert", "high rated", "leading", "official", "recommended",
        "24/7", "local", "premium", "modern", "complete guide to"
    ],
    suffixes: [
        "services", "solutions", "provider", "agency", "near me", "reviews", "online",
        "platform", "tools", "software", "cost", "pricing", "guide", "experts", "consulting",
        "company", "specialist", "management", "system", "tips & strategies"
    ],
    questions: [
        "how to choose best", "where to find top", "what is the best", "why choose",
        "how does work", "best tips for", "how to get affordable"
    ]
};
