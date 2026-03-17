import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { accountName, platform, spend, impressions, clicks, conversions } =
      await req.json();

    const openAiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert digital advertising strategist 
              specializing in Facebook, Instagram, and YouTube ads. 
              Analyze the provided ad account metrics and return 
              3-5 concise, actionable recommendations to improve 
              performance. Be specific, practical, and prioritize 
              by impact. Format as a numbered list.`,
            },
            {
              role: "user",
              content: `Analyze this ad account:
              Account: ${accountName}
              Platform: ${platform}
              Total Spend: $${spend}
              Impressions: ${impressions}
              Clicks: ${clicks}
              Conversions: ${conversions}
              CTR: ${((clicks / impressions) * 100).toFixed(2)}%
              CPC: $${(spend / clicks).toFixed(2)}
              Conversion Rate: ${((conversions / clicks) * 100).toFixed(2)}%`,
            },
          ],
          max_completion_tokens: 2000,
        }),
      }
    );

    const data = await openAiResponse.json();
    const recommendations =
      data.choices?.[0]?.message?.content ?? "No recommendations returned.";

    return new Response(
      JSON.stringify({ success: true, recommendations }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
