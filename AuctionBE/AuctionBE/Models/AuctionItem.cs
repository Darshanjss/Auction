public class AuctionItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal StartingBid { get; set; }
    public decimal CurrentHighestBid { get; set; }
    public DateTime EndDate { get; set; }
    public string ImageUrl { get; set; }
    public List<Bid> BidHistory { get; set; } = new List<Bid>();
}

public class Bid
{
    public decimal Amount { get; set; }
    public DateTime Timestamp { get; set; }
}
