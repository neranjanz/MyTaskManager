using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace API.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class BasicAuthAttribute : TypeFilterAttribute
    {
        public BasicAuthAttribute() : base(typeof(BasicAuthFilter))
        {
        }
    }

    public class BasicAuthFilter : IAsyncActionFilter
    {
        private readonly IUserRepository _userRepository;

        public BasicAuthFilter(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var authHeader = context.HttpContext.Request.Headers["Authorization"];

            if (authHeader != StringValues.Empty)
            {
                var encodedUsernamePassword = authHeader.ToString().Split(' ', 2, StringSplitOptions.RemoveEmptyEntries)[1]?.Trim();
                var decodedUsernamePassword = Encoding.UTF8.GetString(Convert.FromBase64String(encodedUsernamePassword));
                var username = decodedUsernamePassword.Split(':', 2)[0];
                var password = decodedUsernamePassword.Split(':', 2)[1];

                var IsValidUser = await _userRepository.ValidateUserAsync(username,password);

                if (IsValidUser)
                {
                    await next();
                    return;
                }

                // if (username == "user1" && password == "password@1")
                // {
                //     await next();
                //     return;
                // }
                
            }

            context.HttpContext.Response.Headers["WWW-Authenticate"] = "Basic realm=\"http://localhost:5067\"";
            context.Result = new UnauthorizedResult();
        }
    }
}