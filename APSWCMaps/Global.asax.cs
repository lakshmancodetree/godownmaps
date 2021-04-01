using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;

namespace APSWCMaps
{
    public class Global : HttpApplication
    {
        private void Application_BeginRequest() {
            Response.AddHeader("X-XSS-Protection", "1; mode=block");
            Response.AddHeader("X-Content-Type-Options", "nosniff");
            Response.AddHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline' http: https:; script-src 'self' 'unsafe-inline' http: https:; img-src 'self' http: https: data:; style-src 'self' 'unsafe-inline' http: https:; style-src-elem 'self' 'unsafe-inline' http: https:");

        }
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            MvcHandler.DisableMvcResponseHeader = true;
        }

        protected void Application_PostAuthorizeRequest()
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }
    }
}