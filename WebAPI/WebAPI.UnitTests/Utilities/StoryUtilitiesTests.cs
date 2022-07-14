using System;
using System.Collections.Generic;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Constants;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using Xunit;

namespace WebAPI.UnitTests.Utilities
{
    public class StoryUtilitiesTests
    {
        [Fact]
        public void ShouldSortStoriesByTitleAscending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    Title = "TestValue3"
                },
                new Story
                {
                    Title = "TitleValue"
                },
                new Story
                {
                    Title = "TestValue5"
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    Title = "TestValue3"
                },
                new Story
                {
                    Title = "TestValue5"
                },
                new Story
                {
                    Title = "TitleValue"
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.Title, OrderType.Asc);
            
            //Arrange
            Assert.Equal(expectedValue[0].Title, stories[0].Title);
            Assert.Equal(expectedValue[1].Title, stories[1].Title);
            Assert.Equal(expectedValue[2].Title, stories[2].Title);
        }
        
        [Fact]
        public void ShouldSortStoriesByTitleDescending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    Title = "TestValue3"
                },
                new Story
                {
                    Title = "TitleValue"
                },
                new Story
                {
                    Title = "TestValue5"
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    Title = "TitleValue"
                },
                new Story
                {
                    Title = "TestValue5"
                },
                new Story
                {
                    Title = "TestValue3"
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.Title, OrderType.Desc);
            
            //Arrange
            Assert.Equal(expectedValue[0].Title, stories[0].Title);
            Assert.Equal(expectedValue[1].Title, stories[1].Title);
            Assert.Equal(expectedValue[2].Title, stories[2].Title);
        }
        
        [Fact]
        public void ShouldSortStoriesByPriorityAscending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    StoryPriority = StoryPriority.High
                },
                new Story
                {
                    StoryPriority = StoryPriority.Low
                },
                new Story
                {
                    StoryPriority = StoryPriority.Medium
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    StoryPriority = StoryPriority.Low
                },
                new Story
                {
                    StoryPriority = StoryPriority.Medium
                },
                new Story
                {
                    StoryPriority = StoryPriority.High
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.Priority, OrderType.Asc);
            
            //Arrange
            Assert.Equal(expectedValue[0].StoryPriority, stories[0].StoryPriority);
            Assert.Equal(expectedValue[1].StoryPriority, stories[1].StoryPriority);
            Assert.Equal(expectedValue[2].StoryPriority, stories[2].StoryPriority);
        }
        
        [Fact]
        public void ShouldSortStoriesByPriorityDescending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    StoryPriority = StoryPriority.High
                },
                new Story
                {
                    StoryPriority = StoryPriority.Low
                },
                new Story
                {
                    StoryPriority = StoryPriority.Medium
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    StoryPriority = StoryPriority.High
                },
                new Story
                {
                    StoryPriority = StoryPriority.Medium
                },
                new Story
                {
                    StoryPriority = StoryPriority.Low
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.Priority, OrderType.Desc);
            
            //Arrange
            Assert.Equal(expectedValue[0].StoryPriority, stories[0].StoryPriority);
            Assert.Equal(expectedValue[1].StoryPriority, stories[1].StoryPriority);
            Assert.Equal(expectedValue[2].StoryPriority, stories[2].StoryPriority);
        }
        
        [Fact]
        public void ShouldSortStoriesByCreationDateAscending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddDays(-4)
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddMonths(-1)
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddMonths(-1)
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddDays(-4)
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.CreationDate, OrderType.Asc);
            
            //Arrange
            Assert.Equal(expectedValue[0].CreationDate, stories[0].CreationDate);
            Assert.Equal(expectedValue[1].CreationDate, stories[1].CreationDate);
            Assert.Equal(expectedValue[2].CreationDate, stories[2].CreationDate);
        }
        
        [Fact]
        public void ShouldSortStoriesByCreationDateDescending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddDays(-4)
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddMonths(-1)
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddDays(-4)
                },
                new Story
                {
                    CreationDate = DateTime.UtcNow.Date.AddMonths(-1)
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.CreationDate, OrderType.Desc);
            
            //Arrange
            Assert.Equal(expectedValue[0].CreationDate, stories[0].CreationDate);
            Assert.Equal(expectedValue[1].CreationDate, stories[1].CreationDate);
            Assert.Equal(expectedValue[2].CreationDate, stories[2].CreationDate);
        }
        
        [Fact]
        public void ShouldSortStoriesByEstimateAscending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    Estimate = 5
                },
                new Story
                {
                    Estimate = 8
                },
                new Story
                {
                    Estimate = 1
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    Estimate = 1
                },
                new Story
                {
                    Estimate = 5
                },
                new Story
                {
                    Estimate = 8
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.Estimate, OrderType.Asc);
            
            //Arrange
            Assert.Equal(expectedValue[0].Estimate, stories[0].Estimate);
            Assert.Equal(expectedValue[1].Estimate, stories[1].Estimate);
            Assert.Equal(expectedValue[2].Estimate, stories[2].Estimate);
        }
        
        [Fact]
        public void ShouldSortStoriesByEstimateDescending()
        {
            //Assert
            var stories = new List<Story>
            {
                new Story
                {
                    Estimate = 5
                },
                new Story
                {
                    Estimate = 8
                },
                new Story
                {
                    Estimate = 1
                }
            };
            
            var expectedValue = new List<Story>
            {
                new Story
                {
                    Estimate = 8
                },
                new Story
                {
                    Estimate = 5
                },
                new Story
                {
                    Estimate = 1
                }
            };
            
            //Act
            stories = StoryUtilities.SortStoriesByCriteria(stories, SortTypes.Estimate, OrderType.Desc);
            
            //Arrange
            Assert.Equal(expectedValue[0].Estimate, stories[0].Estimate);
            Assert.Equal(expectedValue[1].Estimate, stories[1].Estimate);
            Assert.Equal(expectedValue[2].Estimate, stories[2].Estimate);
        }
    }
}