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
        if len(ballots) == 0:
            return {'winner': None, 'history': None}

        round = 0
        winner = 0
        number_of_candidates = len(ballots[0])
        number_of_voters = len(ballots)
        majority = number_of_voters / 2
        preference_tracker = [0] * number_of_voters
        eliminated_candidates = dict()
        result_history = {}

        for key in ballots[0]:
            eliminated_candidates[key] = 0

        while round < number_of_candidates:
            arr = dict()
            for key in ballots[0]:
                if not eliminated_candidates[key]:
                    arr[key] = 0

            # count votes
            for i in range(0, number_of_voters):
                arr[ballots[i][preference_tracker[i]]] += 1

            result_history[round] = arr

            # check for majority
            smallest = 100000
            lowest = 0

            for i in arr:
                if eliminated_candidates[i] == 1:
                    continue
                if arr[i] > majority:
                    winner = i
                if smallest > arr[i]:
                    smallest = arr[i]
                    lowest = i

            if winner != 0:
                break

            # eliminate loser
            eliminated_candidates[lowest] = 1

            for i in range(0, number_of_voters):
                while eliminated_candidates[ballots[i][preference_tracker[i]]] == 1:
                    preference_tracker[i] += 1
            round += 1

        return {'winner': winner, 'history': result_history}
