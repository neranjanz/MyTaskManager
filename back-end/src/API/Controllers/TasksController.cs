using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Filters;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace API.Controllers
{
    public class TasksController : BaseApiController
    {
        private readonly ITaskItemRepository _taskItemRepo;
        public TasksController(ITaskItemRepository taskItemRepo)
        {
            _taskItemRepo = taskItemRepo;
        }

        [HttpGet]
        [BasicAuth]
        public async Task<ActionResult<IReadOnlyList<TaskItem>>> GetAllTaskItems(string sort, string filter)
        {
            var items = await _taskItemRepo.GetAllTaskItemsAsync(sort, filter);
            return Ok(items);
        }

        [HttpGet("{id}")]
        [BasicAuth]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ApiReponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TaskItem>> GetItem(int id)
        {
            var item = await _taskItemRepo.GetTaskItemByIdAsync(id);

            if (item == null) return NotFound(new ApiReponse(404));
            
            return Ok(item);
        }

        [HttpPost]
        [BasicAuth]
        public async Task<ActionResult<TaskItem>> CreateTaskItem(ItemToCreateDto itemDto)
        {
            var item = DtoMapper.MapDtoToTaskItem(itemDto);

            await _taskItemRepo.CreateTaskItemAsync(item);

            return CreatedAtAction(nameof(GetItem), new {id = item.Id}, item);
        }

        [HttpPut("{id}")]
        [BasicAuth]
        public async Task<ActionResult> UpdateTaskItem(int id, TaskItem itemUpdated)
        {
            var item = await _taskItemRepo.GetTaskItemByIdAsync(id);
            if (item == null) return NotFound(new ApiReponse(404));

            await _taskItemRepo.UpdateTaskItemAsync(id, itemUpdated);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [BasicAuth]
        public async Task<ActionResult> DeleteTaskItem(int id)
        {
            var item = await _taskItemRepo.GetTaskItemByIdAsync(id);

            if (item == null) return NotFound(new ApiReponse(404));
            
            await _taskItemRepo.DeleteTaskItemAsync(id);

            return NoContent();
        }
    }
}