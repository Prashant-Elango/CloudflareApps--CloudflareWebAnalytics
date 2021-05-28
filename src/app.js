(function () {
    'use strict'

    function GenerateCloudflareWebAnalyticsSnippet(token) {
        var cloudflare_web_analytics_template = `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "cloudflare_web_anaytics_token"}'></script><!-- End Cloudflare Web Analytics -->`;

        return cloudflare_web_anaytics_template.replace("cloudflare_web_anaytics_token", token);
    }

    function InsertCodeIntoWebpage(token) {

        /* Insert Cloudflare snippet at the end of body */
        var BodyTag = document.body;
        var existing_BodyContent = BodyTag.innerHTML;
        BodyTag.innerHTML = existing_BodyContent + GenerateCloudflareWebAnalyticsSnippet(token);
    }

    /* 
        Returns true when exclusion criteria is met.

        parameter:
        exclude_from_installing_Here : Array of strings ( ["google.com","0News0.com/"] )
    */
    function ExclusionCriteriaCheck(exclude_from_installing_Here) {

        if (exclude_from_installing_Here.length > 0) {

            for (var index = 0; index < exclude_from_installing_Here.length; index++) {

                if (exclude_from_installing_Here[index].length > 0) {

                    var matches = document.location.href.match(exclude_from_installing_Here[index]);
                    if (matches != undefined) {
                        return true;
                    }
                    else {
                        continue;
                    }
                }
            }
        }

        return false;
    }

    function main() {

        /* Get envrionment variables for Cloudflare Web Analytics */
        var token = INSTALL_OPTIONS.cloudflare_Web_Analytics_Token.trim();
        if (token === undefined) {
            console.error("CloudflareApps--CloudflareWebAnalytics -- Missing token");
            console.error("CloudflareApps--CloudflareWebAnalytics -- installation on hold");
            return -1;
        }

        /* Get Environment variables for page or domain exlusion*/
        var exclude_from_installing_Here = INSTALL_OPTIONS.exclude_url;

        /* Insert code on basis of Exclusion */
        if (ExclusionCriteriaCheck(exclude_from_installing_Here) == false) {
            /* Inserts code */
            InsertCodeIntoWebpage(token);
        }

    }

    main();
})()