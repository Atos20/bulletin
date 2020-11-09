import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  let mockCurrentCategory,
  mockNewsData,
  mockSelecCategory,
  mockSaveReading

  beforeEach(() => {
        mockSaveReading = jest.fn();
        mockSelecCategory = jest.fn();
        mockNewsData =  {
        automobiles: {
            copyright: 'copyright',
            last_updated: 'today',
            nums_results: 1,
            results:[{
            abstract:"A good host, he once said, could set his ego aside and let contestants be all they could be. But he let them know when he thought they missed easy answers.",
            byline: "By Katharine Q. Seelye",
            created_date: "2020-11-08T12:41:08-05:00",
            des_facet: [],
            geo_facet: [],
            item_type:"Article",
            kicker:"",
            material_type_facet:"",
            multimedia: [
                {
                caption:"Alex Trebek in 2010 on the set of “Jeopardy!” As the show’s host, Mr. Trebek was the essence of durability.",
                copyright:"Amanda Edwards/Getty Images",
                format:"superJumbo",
                height:1363,
                subtype:"photo",
                type:"image",
                url:"https://static01.nyt.com/images/2019/10/16/obituaries/00Trebeck1/merlin_76301875_8ff1776a-2a7d-4395-8493-092b35c7005b-superJumbo.jpg",
                width:""
                }
            ],
            org_facet: [],
            per_facet: ["Trebek, Alex"],
            published_date: "2020-11-08T12:41:08-05:00",
            section:"arts",
            short_url:"",
            subsection:"television",
            title:"Alex Trebek, Longtime Host of ‘Jeopardy!,’ Dies at 80",
            updated_date:"2020-11-08T18:44:28-05:00",
            uri:"nyt://article/406907aa-cd83-5fdd-a34b-cae37788f5cc",
            url:"https://www.nytimes.com/2020/11/08/arts/television/alex-trebek-dead.html"
            }],
        }
        }
        mockCurrentCategory = {
            id: 1,
            last_updated:"2020-11-08T13:19:46-05:00",
            newsType: 'cars',
            section: 'cars',
            topStories:[{
                abstract:"A good host, he once said, could set his ego aside and let contestants be all they could be. But he let them know when he thought they missed easy answers.",
                byline: "By Katharine Q. Seelye",
                created_date: "2020-11-08T12:41:08-05:00",
                des_facet: [],
                geo_facet: [],
                item_type:"Article",
                kicker:"",
                material_type_facet:"",
                multimedia: [
                {
                    caption:"Alex Trebek in 2010 on the set of “Jeopardy!” As the show’s host, Mr. Trebek was the essence of durability.",
                    copyright:"Amanda Edwards/Getty Images",
                    format:"superJumbo",
                    height:1363,
                    subtype:"photo",
                    type:"image",
                    url:"https://static01.nyt.com/images/2019/10/16/obituaries/00Trebeck1/merlin_76301875_8ff1776a-2a7d-4395-8493-092b35c7005b-superJumbo.jpg",
                    width:""
                }
                ],
                org_facet: [],
                per_facet: ["Trebek, Alex"],
                published_date: "2020-11-08T12:41:08-05:00",
                section:"arts",
                short_url:"",
                subsection:"television",
                title:"Alex Trebek, Longtime Host of ‘Jeopardy!,’ Dies at 80",
                updated_date:"2020-11-08T18:44:28-05:00",
                uri:"nyt://article/406907aa-cd83-5fdd-a34b-cae37788f5cc",
                url:"https://www.nytimes.com/2020/11/08/arts/television/alex-trebek-dead.html"
            }]
        }
  })


  it('User should see homepage without crashing', () => {
      render(
      <MemoryRouter>
          <HomePage 
              newsData={mockNewsData}
              selectCategory={mockSelecCategory}
              currentCategory={mockCurrentCategory}
              saveReading={mockSaveReading}
          />
      </MemoryRouter>
      );
  });
  
  it('homepage should be able to display stories when ', () => {
      render(
      <MemoryRouter>
          <HomePage 
              newsData={mockNewsData}
              selectCategory={mockSelecCategory}
              currentCategory={mockCurrentCategory}
              saveReading={mockSaveReading}
          />
      </MemoryRouter>
      );

    const catergoryTitle = screen.getByRole('heading', { name: /cars/i });
    const findMoreButton = screen.getByTestId('content-link');
    const readForLaterIcon = screen.getByTestId('read for later icon');
    const abstractContent = screen.getByRole('heading', { name: /Alex Trebek, Longtime Host of ‘Jeopardy!,’ Dies at 80/i });
    const imageContent = screen.getByTestId('article img');
    const dateContent = screen.getByText('Updated date Sunday, November 8, 2020 4:44 PM')
    const contentAuthor = screen.getByText('By Katharine Q. Seelye');

    expect(catergoryTitle).toBeInTheDocument();
    expect(findMoreButton).toBeInTheDocument();
    expect(readForLaterIcon).toBeInTheDocument();
    expect(abstractContent).toBeInTheDocument();
    expect(imageContent).toBeInTheDocument();
    expect(dateContent).toBeInTheDocument();
    expect(contentAuthor).toBeInTheDocument();
  });
});
