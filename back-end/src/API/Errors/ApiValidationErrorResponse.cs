using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiValidationErrorResponse : ApiReponse
    {
        public ApiValidationErrorResponse() : base(400)
        {
        }
        public IEnumerable<string> ErrorList { get; set; }
    }
}