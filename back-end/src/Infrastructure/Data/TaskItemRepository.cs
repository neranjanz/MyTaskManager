using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class TaskItemRepository : ITaskItemRepository
    {
        private readonly TaskDBContext _context;
        public TaskItemRepository(TaskDBContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<TaskItem>> GetAllTaskItemsAsync(string sort, string filter)
        {
            var items = _context.TaskItems.OrderByDescending(item => item.Id).AsQueryable();

            if (!string.IsNullOrEmpty(sort))
            {
                items = sort switch 
                {
                    "titleAsc" => items.OrderBy(item => item.Title),
                    "titleDesc" => items.OrderByDescending(item => item.Title),
                    "idAsc" => items.OrderBy(item => item.Id),
                    "idDesc" => items.OrderByDescending(item => item.Id),
                    _ => items.OrderByDescending(item => item.Id)
                }; 
            }

            if (!string.IsNullOrEmpty(filter))
            {
                items = filter switch
                {
                    "byCompleted" => items.Where(item => item.IsCompleted == true),
                    "byPending" => items.Where(item => item.IsCompleted == false),
                    _ => items
                };
            }

            return await items.ToListAsync();
        }

        public async Task<TaskItem> GetTaskItemByIdAsync(int id)
        {
            return await _context.TaskItems.FindAsync(id);
        }

        public async Task CreateTaskItemAsync(TaskItem item)
        {
            _context.TaskItems.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTaskItemAsync(int id, TaskItem updatedItem)
        {
            var item = await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id);

            if (item != null)
            {
                item.Title = updatedItem.Title;
                item.IsCompleted = updatedItem.IsCompleted;
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTaskItemAsync(int id)
        {
            var item = await _context.TaskItems.FindAsync(id);

            if (item != null)
            {
                _context.TaskItems.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

    }
}