using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace API.Middleware
{
    // public class BasicAuthenticationMiddleware
    // {
    //     private readonly RequestDelegate _next;

    //     public BasicAuthenticationMiddleware(RequestDelegate next)
    //     {
    //         _next = next;
    //     }

    //     public async Task Invoke(HttpContext context)
    //     {
    //         string authHeader = context.Request.Headers["Authorization"];

    //         if (authHeader != null && authHeader.StartsWith("Basic "))
    //         {
    //             var encodedUsernamePassword = authHeader.Split(' ', 2, StringSplitOptions.RemoveEmptyEntries)[1]?.Trim();
    //             var decodedUsernamePassword = Encoding.UTF8.GetString(Convert.FromBase64String(encodedUsernamePassword));
    //             var username = decodedUsernamePassword.Split(':', 2)[0];
    //             var password = decodedUsernamePassword.Split(':', 2)[1];

    //             if (IsAuthorized(username, password))
    //             {
    //                 await _next.Invoke(context);
    //                 return;
    //             }
    //         }

    //         context.Response.Headers["WWW-Authenticate"] = "Basic";
    //         context.Response.StatusCode = 401; // Unauthorized
    //     }

    //     private bool IsAuthorized(string username, string password)
    //     {
    //         return username == "user1" && password == "password@1";
    //     }
    // }
}