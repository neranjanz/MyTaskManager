using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ITaskItemRepository
    {
        Task<IReadOnlyList<TaskItem>> GetAllTaskItemsAsync(string sort, string filter);
        Task<TaskItem> GetTaskItemByIdAsync(int id);
        Task CreateTaskItemAsync(TaskItem item);
        Task UpdateTaskItemAsync(int id, TaskItem item);
        Task DeleteTaskItemAsync(int id);
    }
}