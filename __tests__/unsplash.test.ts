import axios from 'axios';
import { searchImage } from '../src/api/unsplash';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('searchImages()', () => {
  it('returns results when successful', async () => {
    const mockData = [
      {
        id: '1',
        alt_description: 'mountain',
        urls: {
          small: 'img1.jpg',
          regular: 'img1-large.jpg',
          full: 'img1-full.jpg',
        },
        user: { name: 'Alice' },
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: { results: mockData } });

    const result = await searchImage('mountain');

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);

    // You can also match by URL if needed:
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/search/photos'),
      expect.objectContaining({
        params: { query: 'mountain', per_page: 30 },
      })
    );

    expect(result).toEqual(mockData);
  });

  it('throws error when API fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
    await expect(searchImage('fail')).rejects.toThrow('Network error');
  });
});
