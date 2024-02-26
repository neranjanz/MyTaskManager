using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
    public UserController(IUserRepository userRepository)
    {
            _userRepository = userRepository;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register([FromBody] AppUser appUser)
    {
        if (appUser == null || appUser.Username.Trim().Length == 0 || appUser.Password.Trim().Length == 0)
        {
            return BadRequest(new ApiReponse(400, "Invalid user data provided!"));
        }

        var isUserAlreadyExists = await _userRepository.IsUsernameExistAsync(appUser.Username);

        if (isUserAlreadyExists) 
        {
            return BadRequest(new ApiReponse(400, "User alreay exists!"));
        }
        
        var user = await _userRepository.CreateUserAsync(appUser);

        if (user != null)
        {
            return Ok(user);
        }

        return BadRequest(new ApiReponse(400));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login([FromBody] AppUser appUser)
    {
        var user = await _userRepository.LoginAsync(appUser.Username, appUser.Password);

        if (user != null)
        {
            return Ok(user);
        }

        return BadRequest(new ApiReponse(400,"Invalid login attempt"));
    }
    }
}