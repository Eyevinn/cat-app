import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Tab, Tabs } from "@heroui/tabs";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import ParseCard from "@/components/parse-card";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Parse and create&nbsp;</span>
          <br />
          <span className={title({ color: "blue" })}>
            CTA Common Access Tokens&nbsp;
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Specification
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8 w-[80%]">
          <Tabs aria-label="Options">
            <Tab key="parse" title="Parse">
              <ParseCard />
            </Tab>
            <Tab key="create" title="Create"></Tab>
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}
