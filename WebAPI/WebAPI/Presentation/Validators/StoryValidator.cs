using FluentValidation;
using WebAPI.Models.Basic;

namespace WebAPI.Presentation.Validators
{
    public class StoryValidator : AbstractValidator<Story>
    {
        private const string StatusError = "Story cannot be blocked and ready at the same time";
        
        public StoryValidator()
        {
            RuleFor(x => x.StoryId)
                .NotEmpty()
                .When(x => x.RecordVersion != default);
            RuleFor(x => x.RecordVersion)
                .NotEmpty()
                .When(x => x.StoryId != default);
            RuleFor(x => x.Title)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.IsReady)
                .NotEqual(true)
                .When(x => x.IsBlocked)
                .WithMessage(StatusError);
            RuleFor(x => x.IsBlocked)
                .NotEqual(true)
                .When(x => x.IsReady)
                .WithMessage(StatusError);
            RuleFor(x => x.Estimate)
                .GreaterThan(0);
            RuleFor(x => x.BlockReason)
                .NotNull()
                .NotEmpty()
                .When(x => x.IsBlocked)
                .WithMessage("Block reason is required for blocked story");
        }
    }
}