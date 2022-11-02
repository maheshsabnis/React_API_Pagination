using Microsoft.AspNetCore.Mvc;

namespace API_ServerPagination.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        NorthwindContext ctx;
        public SearchController(NorthwindContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet("{top}/{skip}")]
        public async Task<IActionResult> Get(int? top = 5, int? skip = 0)
        {
            ResponseObject response = new ResponseObject();
            response.TotalRecords = (await ctx.CustomersEmployeesShippers.ToListAsync()).Count;
            if (top == 0 && skip == 0)
            {
                response.CustomersEmployeesShipper = await ctx.CustomersEmployeesShippers.ToListAsync();
            }

            if (top > 0 && skip == 0)
            {
                response.CustomersEmployeesShipper = await ctx.CustomersEmployeesShippers
                                         .Take(Convert.ToInt32(top))
                           .ToListAsync<CustomersEmployeesShipper>();
            }
            if (top > 0 && skip > 0)
            {
                response.CustomersEmployeesShipper = await ctx.CustomersEmployeesShippers
                                         .Skip(Convert.ToInt32(skip))
                                         .Take(Convert.ToInt32(top))
                           .ToListAsync<CustomersEmployeesShipper>();
            }

            return Ok(response);
        }


        
    }
}
