using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;

namespace Infrastructure.Data
{
    public class TaskDBContextSeed
    {
        public static async Task SeedDataAsync(TaskDBContext context)
        {
            if (!context.Users.Any())
            {
                var userData = File.ReadAllText("../Infrastructure/Data/SeedData/users.json");
                Console.WriteLine(userData);
                var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
                // foreach(var u in users)
                // {
                //     Console.WriteLine("username: " + u.Username + " password: " + u.Password);
                // }
                context.Users.AddRange(users);
            }

            if (context.ChangeTracker.HasChanges())
                await context.SaveChangesAsync();
        }
    }
}