using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class TestsController : BaseApiController
    {
        private readonly TaskItemRepository _taskItemRepo;
        public TestsController(TaskItemRepository taskItemRepo)
        {
            _taskItemRepo = taskItemRepo;
            
        }
        [HttpGet("servererror")]
        public async Task<ActionResult<TaskItem>> GetServerError()
        {
            var item = await _taskItemRepo.GetTaskItemByIdAsync(9999);

            var description = item.ToString();

            return Ok(item);
        }
    }
}