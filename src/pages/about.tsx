import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>About</h1>
          <p>
            Common Access Token (CAT) is a simple, extensible, policy-bearing
            bearer token for content access. The primary use case for this token
            is to allow content providers to enforce access policies
            efficiently, flexibly, and interoperably. This is particularly
            valuable for audiovisual content access control; however, it is
            equally beneficial as a general-purpose bearer token for any content
            type. This token is usable as an OAUTH bearer token, a URI signing
            token, or more generally as a mechanism for conveying delivery
            policy
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
