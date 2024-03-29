using FluentValidation;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class TeamValidator : AbstractValidator<Team>
    {
        public TeamValidator()
        {
            RuleFor(x => x.Location)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.TeamName)
                .NotNull()
                .NotEmpty();
        }
    }
}