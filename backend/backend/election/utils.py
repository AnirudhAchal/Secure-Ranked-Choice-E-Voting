class Util:
    """
    ballots is a 2-D array of votes where each vote is a list of candidate primary keys 
    listed in preference order of the voter
    Eg: ballots = [
        [1, 2, 3], [2, 3, 1], [3, 1, 2], [1, 3, 2], [2, 1, 3], [3, 2, 1]
    ]
    """
    @staticmethod
    def get_rank_choice_results(ballots):
        round = 0
        winner = 0
        candidates = len(ballots[0])
        voters = len(ballots)
        majority = voters / 2
        track = [0] * voters
        skip = dict()
        result_history = {}

        for key in ballots[0]:
            skip[key] = 0

        while round < candidates:
            arr = dict()
            for key in ballots[0]:
                if not skip[key]:
                    arr[key] = 0

            # count votes
            for i in range(0, voters):
                arr[ballots[i][track[i]]] += 1

            result_history[round] = arr

            # check for majority
            smallest = 100000
            lowest = 0

            for i in arr:
                if skip[i] == 1:
                    continue
                if arr[i] > majority:
                    winner = i
                if smallest > arr[i]:
                    smallest = arr[i]
                    lowest = i

            if winner != 0:
                break

            # eliminate loser
            skip[lowest] = 1

            for i in range(0, voters):
                while skip[ballots[i][track[i]]] == 1:
                    track[i] += 1
            round += 1

        return {'winner': winner, 'history': result_history}
