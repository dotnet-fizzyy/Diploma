using FluentValidation;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class StoryUpdateValidator : AbstractValidator<StoryUpdate>
    {
        public StoryUpdateValidator()
        {
            RuleFor(x => x.Story)
                .NotNull();
            RuleFor(x => x.Parts)
                .NotNull()
                .Must(x => x.Count != default);
        }
    }
}