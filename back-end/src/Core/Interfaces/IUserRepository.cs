using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        Task<AppUser> LoginAsync(string username, string password);
        Task<AppUser> CreateUserAsync(AppUser user);
        Task<bool> IsUsernameExistAsync(string username);
        Task<bool>ValidateUserAsync(string username, string password);
    }
}