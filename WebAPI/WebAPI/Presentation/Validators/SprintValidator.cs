using FluentValidation;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class SprintValidator : AbstractValidator<Sprint>
    {
        public SprintValidator()
        {
            RuleFor(x => x.SprintName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.EpicId)
                .NotEmpty();
            RuleFor(x => x.StartDate)
                .NotEmpty();
            RuleFor(x => x.EndDate)
                .NotEmpty();
        }
    }
}