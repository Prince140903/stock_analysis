import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";

export const sendSignUpEmail = inngest.createFunction(
  { id: "send-signup-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    // You can still keep the user profile if you want to log or use it later.
    const userProfile = `
      - County: ${event.data.county}
      - Investment goals: ${event.data.investmentGoals}
      - Risk tolerance: ${event.data.riskTolerance}
      - Preferred industry: ${event.data.preferredIndustry}
    `;

    // Static welcome message (replace this with whatever tone you prefer)
    const introText = `
    Hi ${event.data.name},

    Welcome to Signalist! 🎉
    We're thrilled to have you on board.

    You now have all the tools you need to track market trends, analyze investments, 
    and make smarter financial decisions.

    Log in to your dashboard anytime to explore insights tailored for you.

    Best regards,  
    The Signalist Team
    `;

    // Send email via Nodemailer
    await step.run("send-welcome-email", async () => {
      const { data: { email, name } } = event;
      return await sendWelcomeEmail({
        email,
        name,
        intro: introText,
      });
    });

    return {
      success: true,
      message: "Welcome email sent successfully (static content)",
    };
  }
);
