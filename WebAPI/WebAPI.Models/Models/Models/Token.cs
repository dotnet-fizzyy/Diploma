namespace WebAPI.Models.Models.Models
{
    public class Token
    {
        public Token() { }
        
        public Token(string type, string value)
        {
            Type = type;
            Value = value;
        }
        
        public string Type { get; set; }

        public string Value { get; set; }
    }
}