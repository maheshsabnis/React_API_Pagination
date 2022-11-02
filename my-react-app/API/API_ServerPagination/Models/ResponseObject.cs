using System;
namespace API_ServerPagination.Models
{
    public class ResponseObject
    {
        public long TotalRecords { get; set; }
        public List<CustomersEmployeesShipper> CustomersEmployeesShipper { get; set; } = new List<CustomersEmployeesShipper>();
    }
}

