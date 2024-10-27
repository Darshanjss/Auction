using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AuctionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private static List<AuctionItem> _auctionItems = new List<AuctionItem>
        {
            new AuctionItem { Id = 1, Title = "Antique Vase", Description = "A beautiful antique vase from the 18th century.", StartingBid = 100, EndDate = DateTime.Parse("2023-12-01T12:00"), ImageUrl = "vase.jpg" },
            new AuctionItem { Id = 2, Title = "Vintage Watch", Description = "A vintage watch in excellent condition.", StartingBid = 250, EndDate = DateTime.Parse("2023-12-15T12:00"), ImageUrl = "" }
        };
        [HttpGet("items")]
        public ActionResult<IEnumerable<AuctionItem>> GetItems()
        {
            return Ok(_auctionItems);
        }
        [HttpGet("{id}")]
        public ActionResult<AuctionItem> GetItem(int id)
        {
            var item = _auctionItems.FirstOrDefault(i => i.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public ActionResult<AuctionItem> CreateItem([FromBody] AuctionItem newItem)
        {
            newItem.Id = _auctionItems.Count > 0 ? _auctionItems.Max(i => i.Id) + 1 : 1;
            _auctionItems.Add(newItem);
            return CreatedAtAction(nameof(GetItem), new { id = newItem.Id }, newItem);
        }

        [HttpPut("{id}")]
        public ActionResult<AuctionItem> UpdateItem(int id, [FromBody] AuctionItem updatedItem)
        {
            var item = _auctionItems.FirstOrDefault(i => i.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            item.Title = updatedItem.Title;
            item.Description = updatedItem.Description;
            item.StartingBid = updatedItem.StartingBid;
            item.EndDate = updatedItem.EndDate;
            item.ImageUrl = updatedItem.ImageUrl;

            return Ok(item);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            var item = _auctionItems.FirstOrDefault(i => i.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            _auctionItems.Remove(item);
            return NoContent();
        }
    }

    [HttpPost("{id}/bid")]
    public ActionResult PlaceBid(int id, [FromBody] Bid newBid)
    {
        var auctionItem = _auctionItems.FirstOrDefault(item => item.Id == id);
        if (auctionItem == null)
        {
            return NotFound();
        }

        if (newBid.Amount <= auctionItem.CurrentHighestBid)
        {
            return BadRequest($"Bid amount must be higher than the current highest bid of {auctionItem.CurrentHighestBid}.");
        }

        auctionItem.CurrentHighestBid = newBid.Amount;
        auctionItem.BidHistory.Add(newBid);

        return Ok(auctionItem);
    }

    [HttpGet("{id}/bids")]
    public ActionResult<IEnumerable<Bid>> GetBidHistory(int id)
    {
        var auctionItem = _auctionItems.FirstOrDefault(item => item.Id == id);
        if (auctionItem == null)
        {
            return NotFound();
        }

        return Ok(auctionItem.BidHistory);
    }

}
