import Link from 'next/link';
import { AtSign, Mail, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import GitHub from '@/app/components/icons/github';

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl">
      <section className="py-12">
        <h1 className="mb-4 text-4xl font-bold">Hello there. I'm Alex.</h1>
        <p className="text-muted-foreground mb-6 text-xl">
          Fuller-stack developer with a focus on privacy and security.
        </p>
        <div className="mb-8 flex flex-wrap gap-3">
          <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">C#</div>
          <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">TypeScript</div>
          <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">Privacy</div>
          <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">Security</div>
        </div>
      </section>

      <section className="border-border border-t py-6">
        <h2 className="mb-4 text-2xl font-bold">For job inquiries</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="https://www.linkedin.com/in/alex-martossy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-2 hover:underline"
          >
            <AtSign size={18} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:jobs.github@mail.martossy.hu"
            className="text-primary flex items-center gap-2 hover:underline"
          >
            <Mail size={18} />
            <span>jobs.github@mail.martossy.hu</span>
          </a>
        </div>
      </section>

      <section className="border-border border-t py-6">
        <h2 className="mb-4 text-2xl font-bold">Currently focusing on</h2>
        <p className="mb-4">My job at Martin Engineering AG.</p>
      </section>

      <section className="border-border border-t py-6">
        <h2 className="mb-4 text-2xl font-bold">Projects worth mentioning</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="https://github.com/alexaka1/distroless-dotnet-healthchecks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center gap-2 hover:underline"
            >
              <GitHub className={`size-4.5`} />
              <span>Distroless .Net healthchecks</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/alexaka1/serilog-extensions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center gap-2 hover:underline"
            >
              <GitHub className={`size-4.5`} />
              <span>Serilog Utf8JsonFormatter</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/alexaka1/mhu-nextjs-sport"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center gap-2 hover:underline"
            >
              <GitHub className={`size-4.5`} />
              <span>Next.js app for an event I attended</span>
            </a>
          </li>
          <li className="flex items-center gap-2">
            <GitHub className={`size-4.5`} />
            <span>
              I contributed the <code className="bg-muted rounded px-1 py-0.5 text-sm">SimpleLogin</code> provider to{' '}
              <code className="bg-muted rounded px-1 py-0.5 text-sm">Auth.js</code>.
            </span>
          </li>
        </ul>
      </section>

      <section className="border-border border-t py-6">
        <h2 className="mb-4 text-2xl font-bold">Looking ahead</h2>
        <p className="mb-4">
          I plan on making more contributions to FOSS projects, especially for tools I already use.
        </p>
      </section>

      <section className="border-border border-t py-6">
        <h2 className="mb-4 text-2xl font-bold">What I want to learn</h2>
        <ul className="ml-2 list-inside list-disc space-y-2">
          <li>Dev containers</li>
          <li>Passkey auth in my apps</li>
          <li>YARP</li>
        </ul>
      </section>

      <section className="border-border border-t py-6">
        <h2 className="mb-4 text-2xl font-bold">Recent blog posts</h2>
        <div className="space-y-6">
          <article className="group">
            <Link href="/blog/getting-started-with-passkeys">
              <h3 className="group-hover:text-primary text-xl font-medium transition-colors">
                Getting Started with Passkeys
              </h3>
              <p className="text-muted-foreground mt-1">
                An introduction to implementing passkey authentication in your web applications.
              </p>
              <div className="text-primary mt-2 flex items-center gap-1 text-sm">
                <span>Read more</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          </article>
          <article className="group">
            <Link href="/blog/distroless-containers-for-dotnet">
              <h3 className="group-hover:text-primary text-xl font-medium transition-colors">
                Distroless Containers for .NET
              </h3>
              <p className="text-muted-foreground mt-1">
                How to build secure, minimal container images for your .NET applications.
              </p>
              <div className="text-primary mt-2 flex items-center gap-1 text-sm">
                <span>Read more</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          </article>
        </div>
        <div className="mt-6">
          {/*<Button asChild variant="outline">*/}
          {/*  <Link href="/blog">*/}
          {/*    View all posts*/}
          {/*    <ArrowRight className="ml-2 h-4 w-4" />*/}
          {/*  </Link>*/}
          {/*</Button>*/}
        </div>
      </section>
    </div>
  );
}
