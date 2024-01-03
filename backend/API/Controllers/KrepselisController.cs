using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using API.Models.DTO;

namespace API.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class KrepselisController : ControllerBase
	{
		private KrepselisService _itemsService;
		private readonly IMapper _mapper;

		public KrepselisController(KrepselisService itemsService, IMapper mapper)
		{
			_itemsService = itemsService;
			_mapper = mapper;
		}

		[HttpGet("{id}")]
		public IActionResult GetPrekiuKrepseliai(Guid id)
		{
			return Ok(_itemsService.GetPrekiuKrepseliai(id));
		}

		[HttpPost]
		public IActionResult PostKrepselis(Krepselis item)
		{
			item.Id = Guid.NewGuid();
			_itemsService.AddKrepselis(item);

			return Ok(item);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteKrepselis(Guid id)
		{
			_itemsService.DeleteKrepselis(id);
			return Ok();
		}

		[HttpPatch("{id}")]
		public IActionResult UpdateItem(Guid id, Krepselis item)
		{
			_itemsService.UpdateKrepselis(id, item);
			return Ok();
		}
	}
}
