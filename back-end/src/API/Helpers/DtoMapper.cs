using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using Core.Entities;

namespace API.Helpers
{
    public class DtoMapper
    {
        public static TaskItem MapDtoToTaskItem(ItemToCreateDto itemDto)
        {
            var taskItem = new TaskItem 
            {
                Id = itemDto.Id,
                Title = itemDto.Title,
                IsCompleted = itemDto.IsCompleted
            };

            return taskItem;
        }
    }
}