import { expect } from "chai"; 
import streamingServiceSelector from "../../streaming.js";

describe("streamingServiceSelector", function() { 

   describe("selectingContent"  ,()=> { 
      it ('If type is difrent than Movie or TV show' , ()=> {
       expect(()=> streamingServiceSelector.selectingContent('somthingElse','Netflix','Comedy' )).to.throw('We currently only support Movie or TV Show types.')
       expect(()=> streamingServiceSelector.selectingContent(3,'Max','Action' )).to.throw('We currently only support Movie or TV Show types.')
       expect(()=> streamingServiceSelector.selectingContent({},'Netflix','Action')).to.throw('We currently only support Movie or TV Show types.')
       expect(()=> streamingServiceSelector.selectingContent([],'Netflix','Action')).to.throw('We currently only support Movie or TV Show types.')
       expect(()=> streamingServiceSelector.selectingContent(undefined,'Netflix','Action')).to.throw('We currently only support Movie or TV Show types.')
          })

      it ('If value of genre is difrent than "Action", "Comedy", "Drama", "Thriller", "Horror", "Romance", "Sci-Fi"' , ()=> {
        expect(()=> streamingServiceSelector.selectingContent('Movie' , 'Max' , 3)).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('Tv show' , 'Max' , 5.12)).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('TV show' , 'Youtube' , -3.23)).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('Movie' , 'Netflix' , false)).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('Movie' , 'HBO' , null)).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('Movie' , 'Rakuten' , [])).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('TV show' , 'Disney' , {})).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('Movie' , 'skyTime' , ``)).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
        expect(()=> streamingServiceSelector.selectingContent('TV show' , 'Max' , undefined)).to.throw('We currently support these genres: Action, Comedy, Drama, Thriller, Horror, Romance, Sci-Fi.')
      })
     
      it('should return the correct message for valid inputs', () => {
        const result1 = streamingServiceSelector.selectingContent('Movie', 'Netflix', 'Action');
        expect(result1).to.equal("You can watch this Action Movie on Netflix. Enjoy your Action-filled experience!");

        const result2 =streamingServiceSelector. selectingContent('TV Show', 'HBO', 'Comedy');
        expect(result2).to.equal("You can watch this Comedy TV Show on HBO. Enjoy your Comedy-filled experience!");
        
        const result3 = streamingServiceSelector.selectingContent('Movie', 'Disney+', 'Sci-Fi');
        expect(result3).to.equal("You can watch this Sci-Fi Movie on Disney+. Enjoy your Sci-Fi-filled experience!");
    });
    })

    describe('availablePlatform',()=>{
        it('should throw an error if platforms is not an array', () => {
            expect(() => streamingServiceSelector.availablePlatforms("Not an array", 1))
                .to.throw("Invalid platform selection.");
            
            expect(() => streamingServiceSelector.availablePlatforms(null, 1))
                .to.throw("Invalid platform selection.");
            
            expect(() => streamingServiceSelector.availablePlatforms({}, 1))
                .to.throw("Invalid platform selection.");}) 

                it('should throw an error if selectedPlatformIndex is not a number or out of bounds', () => {
                    expect(() =>streamingServiceSelector. availablePlatforms(["Netflix", "HBO", "Disney+"], "one"))
                        .to.throw("Invalid platform selection.");
                    
                    expect(() =>streamingServiceSelector. availablePlatforms(["Netflix", "HBO", "Disney+"], -1))
                        .to.throw("Invalid platform selection.");
                    
                    expect(() => streamingServiceSelector.availablePlatforms(["Netflix", "HBO", "Disney+"], 3))
                        .to.throw("Invalid platform selection.");
                    
                    expect(() => streamingServiceSelector.availablePlatforms(["Netflix", "HBO", "Disney+"], undefined))
                        .to.throw("Invalid platform selection.");
                });

                it('should return a string with the remaining platforms after removing the selected platform', () => {
                    const result1 = streamingServiceSelector.availablePlatforms(["Netflix", "HBO", "Disney+"], 1);
                    expect(result1).to.equal("Other available platforms are: Netflix, Disney+.");
            
                    const result2 = streamingServiceSelector.availablePlatforms(["Netflix", "HBO", "Disney+"], 0);
                    expect(result2).to.equal("Other available platforms are: HBO, Disney+.");
            
                    const result3 =streamingServiceSelector.availablePlatforms(["Netflix", "HBO", "Disney+"], 2);
                    expect(result3).to.equal("Other available platforms are: Netflix, HBO.");
                });
   
    })

    describe ('contentRating',()=> {
        it('should throw an error if runtimeInMinutes is not a positive number or viewerRating is out of range', () => {
           
            expect(() => streamingServiceSelector.contentRating(-100, 8)).to.throw("Invalid runtime or rating.");
            expect(() => streamingServiceSelector.contentRating(0, 8)).to.throw("Invalid runtime or rating.");
            expect(() => streamingServiceSelector.contentRating("100", 8)).to.throw("Invalid runtime or rating.");

            expect(() => streamingServiceSelector.contentRating(100, -1)).to.throw("Invalid runtime or rating.");
            expect(() => streamingServiceSelector.contentRating(100, 11)).to.throw("Invalid runtime or rating.");
            expect(() => streamingServiceSelector.contentRating(100, "8")).to.throw("Invalid runtime or rating.");
    })

    it('should return the correct message for highly rated content (rating >= 7)', () => {
        const result1 = streamingServiceSelector.contentRating(120, 8);
        expect(result1).to.equal("This content is highly rated (8/10) and has a runtime of 2.00 hours. Enjoy your watch!");

        const result2 = streamingServiceSelector.contentRating(90, 7);
        expect(result2).to.equal("This content is highly rated (7/10) and has a runtime of 1.50 hours. Enjoy your watch!");
    });

    it('should return the correct message for lower rated content (rating < 7)', () => {
        const result1 =streamingServiceSelector. contentRating(120, 6);
        expect(result1).to.equal("This content has a lower rating (6/10) and runs for 2.00 hours. You might want to check reviews first.");

        const result2 = streamingServiceSelector.contentRating(90, 5);
        expect(result2).to.equal("This content has a lower rating (5/10) and runs for 1.50 hours. You might want to check reviews first.");
    });

})
}); 