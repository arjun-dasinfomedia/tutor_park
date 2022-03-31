import React from "react";

const Instruction = () => {
  return (
    <>
      <div className="mt-5">
        <p>
          <ul>
            <h5 className="mt-2 mb-2">
              To set up email with Amazon Simple Email Service (Amazon SES), you
              need to perform the following tasks:
            </h5>
            <li>
              Before you can access Amazon SES or other AWS services, you need
              to set up an AWS account. For more information,{" "}
              <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sign-up-for-aws.html">
                Signing up for AWS
              </a>
            </li>

            <li>
              Before you send email through Amazon SES, you need to verify that
              you own the "From" address. If your account is still in the Amazon
              SES sandbox, you also need to verify your "To" addresses. You can
              verify email addresses or entire domains. For more information,
              see{" "}
              <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html">
                Verifying identities in Amazon SES.
              </a>
            </li>
            <h5 className="mt-2 mb-2">
              The following tasks are optional depending on what you want to do:
            </h5>

            <li>
              If you want to access Amazon SES through the Amazon SES API,
              whether by the Query (HTTPS) interface or indirectly through an{" "}
              <a href="https://aws.amazon.com/tools/">AWS SDK</a>, the{" "}
              <a href="https://aws.amazon.com/cli/">
                AWS Command Line Interface
              </a>{" "}
              or the{" "}
              <a href="https://aws.amazon.com/powershell/">
                {" "}
                AWS Tools for Windows PowerShell,
              </a>{" "}
              you need to obtain your AWS access keys. For more information, see{" "}
              <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/get-aws-keys.html">
                Getting your AWS access keys.
              </a>
            </li>
            <li>
              If you want to call the Amazon SES API without handling the
              low-level details of the Query interface, you can use an AWS SDK.
              For more information, see{" "}
              <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/download-aws-sdk.html">
                Downloading an AWS SDK.
              </a>
            </li>
            <li>
              When you first sign up for Amazon SES, your account is in the
              Amazon SES sandbox. In the sandbox, you can send emails using the
              same email-sending methods as any other Amazon SES user, except
              that you can only send 200 emails per 24-hour period at a maximum
              rate of one email per second, and you can only send emails to
              addresses you have verified. To increase your sending quotas and
              to send email to unverified email addresses, see{" "}
              <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html">
                {" "}
                Moving out of the Amazon SES sandbox.
              </a>
            </li>
            <li>
              If you want your emails to pass Domain-based Message
              Authentication, Reporting and Conformance (DMARC) authentication
              based on Sender Policy Framework (SPF), configure your identity to
              send from a custom MAIL FROM domain as described in{" "}
              <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/mail-from.html">
                {" "}
                Setting up a custom MAIL FROM domain.
              </a>
            </li>
          </ul>
        </p>
      </div>
    </>
  );
};
export default Instruction;
