import { Metadata } from "next";
import { ChangelogClient } from "./ChangelogClient";

export const metadata: Metadata = {
    title: "Changelog | Wolfmax",
    description: "See what's new in Wolfmax. Latest updates, features, and improvements.",
    openGraph: {
        title: "Changelog | Wolfmax",
        description: "See what's new in Wolfmax. Latest updates, features, and improvements.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Changelog | Wolfmax",
        description: "See what's new in Wolfmax. Latest updates, features, and improvements.",
    },
};

interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string | null;
    body: string | null;
    published_at: string;
    html_url: string;
    prerelease: boolean;
    draft: boolean;
}

async function getGitHubReleases(): Promise<GitHubRelease[]> {
    const owner = process.env.GITHUB_CHANGELOG_OWNER;
    const repo = process.env.GITHUB_CHANGELOG_REPO;

    if (!owner || !repo) {
        return [];
    }

    const headers: HeadersInit = {
        Accept: "application/vnd.github+json",
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/releases?per_page=50`,
            {
                headers,
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!res.ok) return [];

        const releases: GitHubRelease[] = await res.json();
        return releases.filter((r) => !r.draft);
    } catch {
        return [];
    }
}

export default async function ChangelogPage() {
    const releases = await getGitHubReleases();

    return <ChangelogClient releases={releases} />;
}
