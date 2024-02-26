using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly TaskDBContext _context;
        public UserRepository(TaskDBContext context)
        {
            _context = context;
        }

        public async Task<AppUser> CreateUserAsync(AppUser user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> IsUsernameExistAsync(string username)
        {
            var existingUser = await _context.Users
                                .FirstOrDefaultAsync(u => u.Username.Trim().ToLower() == username.Trim().ToLower());

            if (existingUser == null)
                return false;

            return true;
        }

        public async Task<bool> ValidateUserAsync(string username, string password)
        {
            var existingUser = await _context.Users
                                .FirstOrDefaultAsync(u => u.Username.Trim().ToLower() == username.Trim().ToLower());
            
            if (existingUser == null) return false;

            if (existingUser.Password.Trim() != password.Trim()) return false;

            return true;
        }

        public async Task<AppUser> LoginAsync(string username, string password)
        {
            var existingUser = await _context.Users
                    // .FirstOrDefaultAsync(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase)
                    .FirstOrDefaultAsync(u => u.Username.Trim().ToLower() == username.Trim().ToLower());
            
            if (existingUser == null) return null;

            if (existingUser.Password.Trim() != password.Trim()) return null;

            return existingUser;
        }
    }
}